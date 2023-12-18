import { useEffect } from "react";
import { ChatMessages } from "../Components/UI/ChatMessages";
import { SendMessageForm } from "../Components/UI/SendMessageForm";
import { useSocket } from "../Context/UseSecoket";

const ChatPage = () => {
  const Socket = useSocket();

  useEffect(() => {
    Socket.emit("join");
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen max-w-4xl mx-auto py-3 bg-[#2B2B2C]">
      <ChatMessages />
      <SendMessageForm />
    </div>
  );
};

export default ChatPage;
