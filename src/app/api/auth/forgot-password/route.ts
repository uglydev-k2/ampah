import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/utils";

const bodySchema = z.object({
  email: z.string().email("Invalid email address"),
  redirect: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    const { email, redirect = "/admin/login" } = parsed.data;
    const siteUrl = getSiteUrl();
    const redirectTo = `${siteUrl}/auth/verify?next=/auth/reset-password&redirect=${encodeURIComponent(redirect)}`;

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "If that email is registered, a reset link has been sent.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not send reset link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
