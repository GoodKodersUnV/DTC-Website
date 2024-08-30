// middware is disabled for now

import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NEXT_PUBLIC_SIGN_IN_URL } from "./utils/constants";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes, 
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isCronRoute = nextUrl.pathname.startsWith("/api/cron");

  if (isApiAuthRoute || isCronRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  
  if (isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL(NEXT_PUBLIC_SIGN_IN_URL, nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
