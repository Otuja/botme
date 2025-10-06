# 🤖 BotMe — AI Chat App (Next.js + Gemini API)### 

**BotMe** is a modern AI chat application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, powered by **Google Gemini API**.  
It offers a clean, dark interface where users can chat with an AI assistant, manage multiple conversations, and store them locally.

---

## ✨ Features

- 💬 **AI Chat (Gemini API)** — Talk to an intelligent assistant powered by Gemini.
- 💾 **Local Storage Persistence** — Chats remain saved even after refreshing.
- ➕ **Multiple Conversations** — Create, switch, and clear chat sessions easily.
- 📱 **Responsive UI** — Works beautifully across all devices.
- ⚡ **Streaming Responses** — AI messages appear in real time.
- 🧭 **Independent Scrolling** — Sidebar and chat body scroll separately.
- 🧠 **Next.js App Router** — Clean, modern folder-based routing.
- 🎨 **Tailwind CSS** — Sleek and minimal dark theme design.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js 14** | Framework for React and routing |
| **React Hooks** | State and lifecycle management |
| **Tailwind CSS** | Styling and responsive design |
| **Lucide React / React Icons** | Icon set |
| **Gemini API** | AI text generation |
| **LocalStorage** | Browser-side chat persistence |
| **TypeScript** | Type-safe development |

---


---

## ⚙️ Installation & Setup

### 1. Clone the Repository

git clone https://github.com/johnpraise/botme-chat.git
cd botme-chat
2. Install Dependencies

npm install
- # or
- yarn install
### 3. Configure Environment Variables
- Create a .env.local file in the project root and add your Gemini API key:

- GEMINI_API_KEY=your_gemini_api_key_here
🔐 You can get a free Gemini API key at Google AI Studio.

### 4. Run the App
- npm run dev
- # or
- yarn dev
Then visit http://localhost:3000.



## 💡 Future Improvements

- ✏️ Rename chat titles

- 📤 Export or share chat history

- 👥 Add user authentication (save chats to DB)

- 📱 Progressive Web App (PWA) support

- 🌙 Theme toggle (Light/Dark mode)