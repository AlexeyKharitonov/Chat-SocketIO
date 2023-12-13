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
import EmojiPicker from "emoji-picker-react";
import Emojiicon from "../../Images/emoji.svg";

const socket = io(configFile.apiEndpoint);

const SendMessageForm: FC = () => {
  const dispatch = useDispatch();
  const [messageContent, setMessageContent] = useState("");
  const [isOpen, setOpen] = useState(false);

  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );

  interface EmojiObject {
    emoji: string;
  }

  const onEmojiClick = ({ emoji }: EmojiObject): void => {
    setMessageContent((prevContent) => `${prevContent} ${emoji}`);
    setOpen(false);
  };

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
        <div className="flex w-full gap-4 relative">
          <div className="relative w-full">
            <textarea
              value={messageContent}
              onChange={({ target: { value } }) => setMessageContent(value)}
              placeholder="Написать сообщение..."
              className="w-full px-6 py-4 pl-10 rounded-2xl bg-[#232323] text-[#8A8A8A] font-semibold text-base outline-none resize-none"
              rows={1}
            />
            <div className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer">
              <img
                src={Emojiicon}
                width={22}
                alt="Emoji"
                className="cursor-pointer"
                onClick={() => setOpen(!isOpen)}
              />

              {isOpen && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  scale-75">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div>
          <div className="flex-grow w-44">
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
