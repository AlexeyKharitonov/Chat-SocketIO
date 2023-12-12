import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../../../Redux/Messages/Messages";
import { RootState } from "../../../Redux/CreateStore";
import { useSortMessages } from "../../../Hooks/UseSortMessages";
import { displayDate } from "../../../Utils/DisplayDate";
// import InfiniteScroll from "react-infinite-scroll-component";
import DropDownSort from "../DropDownSort/DropDownSort";
import { completionOfWord } from "../../../Utils/CompletionOfWord";
import Button from "../../Common/Button";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../Redux/Users/Users";

const Messages: FC = () => {
  // const dispatch = useDispatch();

  const messages = useSelector(getAllMessages());
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortedMessages, setSortedType } = useSortMessages(messages);

  useEffect(() => {
    const element = document.querySelector(".scroll-container");
    if (element) element.scrollTop = element.scrollHeight;
  }, [sortedMessages]);

  const users = useSelector((state: RootState) => state.users.users);

  const handleClick = () => {
    dispatch(userLogout());
    navigate("/");
  };

  // const getNewMessages = (): void => null;

  // const fetchMoreData = () => {
  //   const newMessages = getNewMessages();
  //   newMessages.forEach((message) => {
  //     dispatch(addMessage(message));
  //   });
  // };

  return (
    <>
      <div className="flex-none mb-1.5 p-2 bg-[#232323] border-2 border-[#8A8A8A] text-white font-bold rounded-3xl">
        <div className="flex justify-between items-center px-12">
          <DropDownSort setSortType={setSortedType} />
          <span className="text-[#8A8A8A] text-2xl ">
            В чате сейчас {""}
            <span className="text-[#6968FF]">
              {completionOfWord(users.length)}
            </span>
          </span>
          <Button
            classes={"bg-buttonColor hover:bg-buttonHover text-buttonTextColor"}
            handleClick={handleClick}
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
          // <InfiniteScroll
          //   dataLength={sortedMessages?.length}
          //   next={fetchMoreData}
          //   hasMore={true}
          //   loader={<h4>Loading...</h4>}
          // >
          <>
            {sortedMessages?.map((message) => (
              <div
                key={message.timestamp}
                className={`flex flex-col mb-5 ${
                  currentUser ? "items-end" : "items-start"
                }`}
              >
                <p className="px-3 font-bold text-sm mb-1 text-[#8A8A8A] ">
                  {message.sender.nickName}
                </p>
                <div
                  className={`p-4 ${
                    currentUser ? "bg-[#9e9797]" : "bg-[#514c4c]"
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
          // </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Messages;
