import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../Redux/CreateStore";
import { getAllMessages } from "../../../Redux/Messages";
import { userLogout, updateUsers } from "../../../Redux/Users";
import { useSortMessages } from "../../../Hooks/UseSortMessages";
import { DropDownSort } from "../DropDownSort";
import { displayDate } from "../../../Utils/DisplayDate";
import { Button } from "../../Common/Button";
import io from "socket.io-client";
import configFile from "../../../config.json";
import { completionOfWord } from "../../../Utils/CompletionOfWord";

const socket = io(configFile.apiEndpoint);

const ChatMessages = () => {
  const messages = useSelector(getAllMessages());
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );

  const users = useSelector((state: RootState) => state.users.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortedMessages, setSortedType } = useSortMessages(messages);

  useEffect(() => {
    if (!messages.length && !users.length) {
      navigate("/");
    }
  }, [messages, users, navigate]);

  useEffect(() => {
    const element = document.querySelector(".scroll-container");
    if (element) element.scrollTop = element.scrollHeight;
  }, [sortedMessages]);

  const handleLogout = () => {
    socket.emit("user_logout", currentUser?.nickName);

    dispatch(userLogout());
    navigate("/");
  };

  useEffect(() => {
    socket.on("update_users", (updatedUsers) => {
      dispatch(updateUsers(updatedUsers));
    });

    return () => {
      socket.off("update_users");
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
