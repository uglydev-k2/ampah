import { NextResponse } from "next/server";
import { z } from "zod";
import { generateAssistantReply } from "@/lib/ai/respond";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 20;
const WINDOW_MS = 60_000;

const bodySchema = z.object({
  message: z.string().min(1, "Message is required").max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })
    )
    .max(20)
    .optional()
    .default([]),
});

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid message" },
        { status: 400 }
      );
    }

    const { message, history } = parsed.data;
    const { reply } = await generateAssistantReply(message, history);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Could not process your question." }, { status: 500 });
  }
}
