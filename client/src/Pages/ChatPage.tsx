import { useEffect } from "react";
import io from "socket.io-client";
import { ChatMessages } from "../Components/UI/ChatMessages";
import { SendMessageForm } from "../Components/UI/SendMessageForm";
import configFile from "../config.json";

const socket = io(configFile.apiEndpoint);

const ChatPage = () => {
  useEffect(() => {
    socket.emit("join");
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen max-w-4xl mx-auto py-3 bg-[#2B2B2C]">
      <ChatMessages />
      <SendMessageForm />
    </div>
  );
};

export default ChatPage;
