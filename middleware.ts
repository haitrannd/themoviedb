import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/app/lib/services";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    if (request.nextUrl.pathname.startsWith("/user/profile")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/user/logout")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (session.isLoggedIn) {
    if (request.nextUrl.pathname.startsWith("/user/login")) {
      return NextResponse.redirect(new URL("/user/profile", request.url));
    }
  }
}

export const config = {
  matcher: ["/user/profile", "/user/login", "/user/logout"],
};
