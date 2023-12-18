import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAllMessages, getAllMessages } from "../../../Redux/Messages";
import {
  userLogout,
  updateUsers,
  getCurrentUser,
  getAllUsers,
} from "../../../Redux/Users";
import { useSocket } from "../../../Context/UseSecoket";
import { useSortMessages } from "../../../Hooks/UseSortMessages";
import { DropDownSort } from "../DropDownSort";
import { displayDate } from "../../../Utils/DisplayDate";
import { Button } from "../../Common/Button";
import { completionOfWord } from "../../../Utils/CompletionOfWord";
import UseScrollToBottom from "../../../Hooks/UseScrollToBottom";

const ChatMessages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messages = useSelector(getAllMessages);
  const currentUser = useSelector(getCurrentUser);
  const users = useSelector(getAllUsers);

  const Socket = useSocket();

  const { sortedMessages, setSortedType } = useSortMessages(messages);

  useEffect(() => {
    if (!users.length) {
      dispatch(deleteAllMessages());
      navigate("/");
    }
  }, [messages, users, navigate]);

  UseScrollToBottom(sortedMessages);

  const handleLogout = () => {
    Socket.emit("user_logout", currentUser?.nickName);
    dispatch(userLogout());
    navigate("/");
  };

  useEffect(() => {
    Socket.on("update_users", (updatedUsers) => {
      dispatch(updateUsers(updatedUsers));
    });

    return () => {
      Socket.off("update_users");
    };
  }, [dispatch]);

  return (
    <>
      <div className="flex-none mb-1.5 p-2 bg-[#232323] border-2 border-[#8A8A8A] text-white font-bold rounded-3xl">
        <div className="flex justify-between items-center px-12">
          <DropDownSort setSortType={setSortedType} />
          <span className="text-[#8A8A8A] text-2xl ">
            В чате сейчас {""}
            <span className="text-[#6968FF] ">
              {completionOfWord(users.length)}
            </span>
          </span>
          <Button
            classes={
              "bg-buttonColor hover:bg-buttonHover  text-lg text-buttonTextColor "
            }
            handleClick={handleLogout}
          >
            Выйти из чата
          </Button>
        </div>
      </div>
      <div className="scroll-container py-3 px-8 overflow-auto flex-1 min-h-0">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-[#8A8A8A] opacity-50 m-auto text-xl text-center font-bold">
              Сообщений пока нет
            </p>
          </div>
        ) : (
          <>
            {sortedMessages?.map((message) => (
              <div
                key={message.timestamp}
                className={`flex flex-col mb-5 ${
                  currentUser?.id === message.sender.id
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <p className="px-3 font-bold text-sm mb-1 text-[#8A8A8A] ">
                  {message.sender.nickName}
                </p>
                <div
                  className={`p-4 ${
                    currentUser?.id === message.sender.id
                      ? "bg-[#9e9797]"
                      : "bg-[#514c4c]"
                  } mb-0.5 inline-block text-left word-wrap max-w-[50%] text-white rounded-2xl break-words`}
                >
                  <p>{message.content}</p>
                </div>
                <p className="text-[#8A8A8A] text-xs px-3">
                  {displayDate(new Date(message.timestamp))}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export { ChatMessages };
