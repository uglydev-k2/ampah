import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  secret: z.string().min(8),
});

/** One-time admin password setup. Requires SUPABASE_SERVICE_ROLE_KEY + ADMIN_SETUP_SECRET on the server. */
export async function POST(request: Request) {
  const setupSecret = process.env.ADMIN_SETUP_SECRET;
  if (!setupSecret || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Setup is not configured on the server." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (parsed.data.secret !== setupSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient();
    const { data: users, error: listError } = await admin.auth.admin.listUsers({
      perPage: 1000,
    });

    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const user = users.users.find(
      (u) => u.email?.toLowerCase() === parsed.data.email.toLowerCase()
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
      password: parsed.data.password,
      email_confirm: true,
    });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    await admin.from("profiles").upsert(
      {
        id: user.id,
        email: parsed.data.email,
        role: "admin",
      },
      { onConflict: "id" }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Setup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
