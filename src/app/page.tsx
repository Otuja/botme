"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [chats, setChats] = useState<{ id: number; title: string }[]>([]);
  const [loaded, setLoaded] = useState(false); // wait until localStorage is ready

  // Load chats on mount
  useEffect(() => {
    const saved = localStorage.getItem("chats");
    if (saved) {
      setChats(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  // Create new chat and redirect
  const createNewChat = () => {
    if (!loaded) return; // prevent firing before hydration

    const newId = Date.now();
    const newChat = { id: newId, title: `New Chat ${chats.length + 1}` };
    const updated = [...chats, newChat];
    setChats(updated);
    localStorage.setItem("chats", JSON.stringify(updated));

    // ✅ redirect to chat page
    router.push(`/chat/${newId}`);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#262626] text-white">
      <h1 className="text-3xl font-bold mb-4">🤖 Welcome to BotMe</h1>
      <p className="text-gray-400 mb-6">Your AI assistant powered by Gemini</p>
      <button
        onClick={createNewChat}
        disabled={!loaded}
        className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:scale-105 transition disabled:opacity-50"
      >
        Start New Chat
      </button>
    </main>
  );
}
