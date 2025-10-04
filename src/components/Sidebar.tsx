"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { PiSidebarSimpleThin } from "react-icons/pi";
import { RiChatNewLine, RiDeleteBin4Line } from "react-icons/ri";
import Link from "next/link";
import clsx from "clsx";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [chats, setChats] = useState<{ id: number; title: string }[]>([]);
  const router = useRouter();

  // Load chats from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chats");
    if (saved) {
      setChats(JSON.parse(saved));
    }
  }, []);

  // Save chats whenever they change
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // Create new chat and redirect
  const createNewChat = () => {
    const newId = Date.now();
    const newChat = { id: newId, title: `New Chat ${chats.length + 1}` };
    const updated = [...chats, newChat];
    setChats(updated);
    localStorage.setItem("chats", JSON.stringify(updated));

    router.push(`/chat/${newId}`);
  };

  // Clear all chats and messages
  const clearChats = () => {
    localStorage.removeItem("chats");
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("chat-")) {
        localStorage.removeItem(key);
      }
    });
    setChats([]);
    router.push("/");
  };

  return (
    <div
      className={clsx(
        "hidden md:flex flex-col bg-[#171717] text-white border-r border-[#404040] min-h-screen transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-[#171717] border-b border-[#404040] flex items-center justify-between p-3">
        {isOpen && <h1 className="text-lg font-bold">Bot Me</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-[#404040] transition"
        >
          {isOpen ? (
            <X size={20} className="text-[#a3a3a3]" />
          ) : (
            <PiSidebarSimpleThin size={20} className="text-[#a3a3a3]" />
          )}
        </button>
      </div>

      {/* Fixed New Chat Button */}
      <div className="sticky top-[49px] z-10 bg-[#171717] border-b border-[#404040] p-3">
        <button
          onClick={createNewChat}
          className="w-full flex items-center gap-2 hover:bg-[#404040] px-3 py-2 rounded-lg text-sm transition"
        >
          <RiChatNewLine size={18} className="text-[#a3a3a3]" />
          {isOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* Scrollable Chat List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#404040] transition"
          >
            {isOpen && <span className="truncate">{chat.title}</span>}
          </Link>
        ))}
      </div>

      {/* Fixed Footer */}
      <div className="sticky bottom-0 bg-[#171717] border-t border-[#404040] p-3">
        <button
          onClick={clearChats}
          className="flex w-full items-center gap-2 p-2 rounded-lg hover:bg-[#404040] transition"
        >
          <RiDeleteBin4Line size={18} className="text-[#a3a3a3]" />
          {isOpen && <span>Clear Chats</span>}
        </button>
      </div>
    </div>
  );
}
