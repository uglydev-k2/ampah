import {
  buildSystemPrompt,
  fallbackReply,
  type ChatMessage,
} from "@/lib/ai/pharmacy-assistant";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export async function generateAssistantReply(
  message: string,
  history: ChatMessage[]
): Promise<{ reply: string; source: "openai" | "fallback" }> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return { reply: fallbackReply(message), source: "fallback" };
  }

  try {
    const recentHistory = history.slice(-8).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...recentHistory,
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      return { reply: fallbackReply(message), source: "fallback" };
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return { reply: fallbackReply(message), source: "fallback" };
    }

    return { reply, source: "openai" };
  } catch {
    return { reply: fallbackReply(message), source: "fallback" };
  }
}
