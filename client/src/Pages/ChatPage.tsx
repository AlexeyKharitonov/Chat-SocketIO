import { FC, useEffect } from "react";
import io from "socket.io-client";
import configFile from "../config.json";
import Messages from "../Components/UI/Messages/Messages";
// import InfoChat from "../Components/UI/InfoChat/InfoChat";
import SendMessageForm from "../Components/UI/SendMessageForm";

const socket = io(configFile.apiEndpoint);

const ChatPage: FC = () => {
  useEffect(() => {
    socket.emit("join");
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen max-w-4xl mx-auto py-3 bg-[#2B2B2C]">
      {/* <InfoChat /> */}
      <Messages />
      <SendMessageForm />
    </div>
  );
};

export default ChatPage;
