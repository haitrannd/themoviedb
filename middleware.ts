import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/app/lib/services";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    if (
      request.nextUrl.pathname.startsWith("/user/profile") ||
      request.nextUrl.pathname.startsWith("/user/logout") ||
      request.nextUrl.pathname.startsWith("/user/submitted-movie") ||
      request.nextUrl.pathname.startsWith("/movies/popular")
    ) {
      return NextResponse.redirect(new URL("/?l=false", request.url));
    }
  }

  if (session.isLoggedIn) {
    if (request.nextUrl.pathname.startsWith("/user/login")) {
      return NextResponse.redirect(new URL("/user/profile", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/user/profile",
    "/user/login",
    "/user/logout",
    "/user/submitted-movie",
    "/movies/popular",
  ],
};
