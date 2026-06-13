"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What are your delivery options?",
  "How do I upload a prescription?",
  "Do you deliver to Accra?",
  "What are your opening hours?",
];

export function PharmacyAiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm Ampah Assistant. Ask me about products, delivery, prescriptions, or our pharmacy services.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError("");
    setInput("");
    const userMessage: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.filter((m) => m.role === "user" || m.role === "assistant"),
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }

      setMessages([...nextMessages, { role: "assistant", content: data.reply ?? "Sorry, I couldn't answer that." }]);
    } catch {
      setError("Network error. Check your connection and try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {open && (
          <div
            className={cn(
              "flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl",
              "dark:border-gray-800 dark:bg-gray-900",
              "animate-in fade-in slide-in-from-bottom-4 duration-200"
            )}
            role="dialog"
            aria-label="Ampah Assistant chat"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-emerald-600 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Ampah Assistant</p>
                  <p className="text-xs text-blue-100">Ask about products & services</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 hover:bg-white/20"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex max-h-[min(60vh,420px)] flex-1 flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        msg.role === "user"
                          ? "rounded-br-md bg-blue-600 text-white"
                          : "rounded-bl-md bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950 dark:text-red-300">
                    {error}
                  </p>
                )}

                <div ref={bottomRef} />
              </div>

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 border-t border-gray-100 px-4 py-3 dark:border-gray-800">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <form
                className="border-t border-gray-100 p-3 dark:border-gray-800"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
              >
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(input);
                      }
                    }}
                    rows={1}
                    placeholder="Ask a question…"
                    className="max-h-24 flex-1 resize-none rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-950"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-[10px] leading-snug text-gray-400">
                  Not medical advice. For emergencies call emergency services. {siteConfig.contact.phone}
                </p>
              </form>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 px-4 py-3 text-white shadow-lg shadow-blue-600/30 transition hover:scale-105 hover:shadow-xl",
            open && "ring-2 ring-blue-400 ring-offset-2 dark:ring-offset-gray-950"
          )}
          aria-expanded={open}
          aria-label={open ? "Close Ampah Assistant" : "Open Ampah Assistant"}
        >
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          {!open && (
            <>
              <span className="hidden text-sm font-medium sm:inline">Ask AI</span>
              <Sparkles className="h-4 w-4 opacity-80" />
            </>
          )}
        </button>
      </div>
    </>
  );
}
