import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { registerSchema } from "@/lib/validations/schemas";

export async function POST(request: Request) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          error:
            "Signup is temporarily unavailable. Add SUPABASE_SERVICE_ROLE_KEY to the server environment, or run supabase/migrations/002_fix_signup_trigger.sql in the Supabase SQL Editor.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid registration data" },
        { status: 400 }
      );
    }

    const { fullName, email, phone, password } = parsed.data;
    const admin = createAdminClient();

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone: phone ?? null,
      },
    });

    if (error) {
      const message =
        error.message.includes("already been registered") ||
        error.message.includes("already registered")
          ? "An account with this email already exists. Try signing in."
          : error.message;
      return NextResponse.json({ error: message }, { status: 400 });
    }

    if (data.user) {
      const { error: profileError } = await admin.from("profiles").upsert(
        {
          id: data.user.id,
          email,
          full_name: fullName,
          phone: phone ?? null,
          role: "customer",
        },
        { onConflict: "id" }
      );

      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully. You can sign in now.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
