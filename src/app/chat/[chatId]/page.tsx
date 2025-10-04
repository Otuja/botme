import ChatBody from "../page";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params; 
  return <ChatBody key={chatId} chatId={chatId}/>;
}
