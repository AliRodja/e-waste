import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const roleByPrefix: Record<string, string> = {
  "/dashboard": "USER",
  "/pickups": "USER",
  "/mitra": "MITRA",
  "/admin": "ADMIN",
};

export default auth(function proxy(req) {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const prefix = Object.keys(roleByPrefix).find((p) => pathname.startsWith(p));
  if (!prefix) return NextResponse.next();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session.user.role !== roleByPrefix[prefix]) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/pickups/:path*", "/mitra/:path*", "/admin/:path*"],
};
