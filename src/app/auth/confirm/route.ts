import { type NextRequest, NextResponse } from "next/server";

/** Legacy path — forward to client verify handler with the same query string. */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/auth/verify";
  return NextResponse.redirect(url);
}
