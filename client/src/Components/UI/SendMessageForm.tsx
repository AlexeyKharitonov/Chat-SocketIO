import { FC, useState } from "react";
import { IMessage } from "../../Types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/CreateStore";
import { trimString } from "../../Utils/trimString";
import io from "socket.io-client";
import configFile from "..//../config.json";
import { addMessage } from "../../Redux/Messages/Messages";
import Button from "../Common/Button";
import { IoSend } from "react-icons/io5";

const socket = io(configFile.apiEndpoint);

const SendMessageForm: FC = () => {
  const dispatch = useDispatch();
  const [messageContent, setMessageContent] = useState("");

  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentUser) {
      const message: IMessage = {
        content: trimString(messageContent),
        sender: currentUser,
        timestamp: Date.now(),
      };
      if (message.content.length === 0) return;

      dispatch(addMessage(message));
      socket.emit("chat message", message);
    }
    setMessageContent("");
  };

  return (
    <div className="px-4 py-1 space-x-3">
      <form onSubmit={handleSubmit} className="flex w-full gap-4">
        <div className="flex w-full gap-4">
          <input
            type="text"
            value={messageContent}
            onChange={({ target: { value } }) => setMessageContent(value)}
            placeholder="Написать сообщение..."
            className="flex-grow w-full px-6 py-4 rounded-2xl bg-[#232323] text-[#8A8A8A] font-semibold text-base outline-none placeholder:text-opacity-50"
            // style={{ opacity: 0.5 }}
          />
          <div className=" flex-grow w-44 ">
            <Button
              classes={
                "bg-buttonColor w-full text-lg hover:bg-buttonHover text-buttonTextColor font-semibold px-9 py-5 h-14"
              }
            >
              <IoSend size={37} color={"#6968FF"} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendMessageForm;
