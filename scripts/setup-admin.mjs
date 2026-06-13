#!/usr/bin/env node
/**
 * Applies Supabase signup fix + promotes admin user.
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local or environment.
 *
 * Usage: node scripts/setup-admin.mjs
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvLocal() {
  const path = resolve(root, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL || "ampahnyame10@icloud.com";
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = process.env.ADMIN_NAME || "Nyame-Ampah odomankoma";

if (!url || !serviceKey) {
  console.error(
    "Missing SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add it to .env.local from Supabase → Settings → API → service_role key.\n" +
      "Also run supabase/migrations/002_fix_signup_trigger.sql in the SQL Editor first."
  );
  process.exit(1);
}

if (!adminPassword) {
  console.error("Set ADMIN_PASSWORD in the environment before running this script.");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(email) {
  const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (error) throw error;
  return data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
}

async function main() {
  console.log("Setting up admin for:", adminEmail);

  let user = await findUserByEmail(adminEmail);

  if (!user) {
    console.log("Creating admin user...");
    const { data, error } = await admin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { full_name: adminName, phone: "0532651683" },
    });
    if (error) {
      console.error("Create user failed:", error.message);
      if (error.message.includes("Database error")) {
        console.error("\nRun 002_fix_signup_trigger.sql in Supabase SQL Editor first, then retry.");
      }
      process.exit(1);
    }
    user = data.user;
    console.log("User created:", user.id);
  } else {
    console.log("User exists:", user.id);
    await admin.auth.admin.updateUserById(user.id, {
      password: adminPassword,
      email_confirm: true,
    });
  }

  const { error: profileError } = await admin.from("profiles").upsert(
    {
      id: user.id,
      email: adminEmail,
      full_name: adminName,
      phone: "0532651683",
      role: "admin",
    },
    { onConflict: "id" }
  );

  if (profileError) {
    console.error("Profile upsert failed:", profileError.message);
    process.exit(1);
  }

  console.log("\nAdmin setup complete!");
  console.log("Login URL: http://localhost:3000/admin/login");
  console.log("Live URL:  https://ampah-7g16.vercel.app/admin/login");
  console.log("Email:    ", adminEmail);
  console.log("Password: ", adminPassword);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
