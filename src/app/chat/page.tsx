"use client";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

export default function ChatBody({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Load messages when chatId changes
  useEffect(() => {
    const saved = localStorage.getItem(`chat-${chatId}`);
    if (saved && saved !== "[]") {
      setMessages(JSON.parse(saved));
    } else {
      const intro: Message = {
        id: Date.now(),
        sender: "ai",
        text: "👋 Hi! I’m BotMe. Ask me anything powered by Gemini AI.",
      };
      setMessages([intro]);
      localStorage.setItem(`chat-${chatId}`, JSON.stringify([intro]));
    }
  }, [chatId]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat-${chatId}`, JSON.stringify(messages));
    }
  }, [messages, chatId]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "ai",
            text: errorData.reply || "API Error",
          },
        ]);
        return;
      }

      const aiId = Date.now() + 1;
      setMessages((prev) => [...prev, { id: aiId, sender: "ai", text: "" }]);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { value, done } = await reader!.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        // strip "ai:" if backend sends it
        const clean = accumulated.replace(/^ai:\s*/i, "");

        setMessages((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, text: clean } : m))
        );
      }
    } catch (err) {
      console.error("Frontend error:", err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "ai", text: "Error: API not reachable" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#262626] text-white">
      {/* Navbar */}
      <nav className="hidden md:flex px-6 py-4 border-b border-[#404040] sticky top-0 bg-[#262626]">
        <h1 className="text-lg font-bold">Chat {chatId}</h1>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-5 py-3 rounded-2xl max-w-xl whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-[#404040] rounded-br-none"
                  : "bg-[#333] rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-gray-400 text-sm animate-pulse">🤖 Thinking...</p>
        )}
        <div ref={bottomRef} />
      </div>

        {/* Input Box */}
      <div className="sticky bottom-0 px-6 py-4 bg-[#262626]">
        <div className="max-w-3xl mx-auto flex items-center bg-[#171717] border border-[#404040] shadow-2xl rounded-full px-5 py-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
            }
            placeholder="Ask anything"
            className="flex-1 bg-transparent outline-none text-sm resize-none scrollbar-hide placeholder:text-white text-white"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="ml-3 p-2 rounded-full bg-white text-black cursor-pointer hover:scale-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>

        <footer className="flex justify-center text-xs mt-2">
          <p>BotMe can make mistakes. Check important info.</p>
        </footer>
      </div>
    </div>
  );
}
