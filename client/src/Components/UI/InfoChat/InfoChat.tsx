import { FC } from "react";
import DropDownSort from "../DropDownSort/DropDownSort";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../../../Redux/Messages/Messages";
import { useSortMessages } from "../../../Hooks/UseSortMessages";
import { completionOfWord } from "../../../Utils/CompletionOfWord";
import Button from "../../Common/Button";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../Redux/Users/Users";
import { RootState } from "../../../Redux/CreateStore";

const InfoChat: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messages = useSelector(getAllMessages());
  const users = useSelector((state: RootState) => state.users.users);

  const { setSortedType } = useSortMessages(messages);

  const handleClick = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
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
  );
};

export default InfoChat;
