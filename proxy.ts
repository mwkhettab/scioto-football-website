import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@daveyplate/next-rate-limit";

export async function proxy(request: NextRequest) {
  const { method, nextUrl, headers } = request;
  const pathname = nextUrl.pathname;

  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    (request as any).ip ||
    "Unknown IP";

  console.log(`[Logger] ${method} ${pathname}`);
  console.log(`IP: ${ip}`);
  console.log(`Query: ${nextUrl.search}`);
  console.log(`Referrer: ${headers.get("referer") || "N/A"}`);
  console.log(`User-Agent: ${headers.get("user-agent") || "N/A"}`);

  const response = NextResponse.next();

  // rate limiting to avoid abuse
  if (pathname === "/api/contact") {
    return await rateLimit({
      request,
      response,
      sessionLimit: 1,
      ipLimit: 1,
      sessionWindow: 86400,
      ipWindow: 86400,
    });
  } else {
    return await rateLimit({
      request,
      response,
      sessionLimit: 100,
      ipLimit: 100,
      sessionWindow: 600,
      ipWindow: 600,
    });
  }
}

export const config = {
  matcher: "/api/:path*",
};
