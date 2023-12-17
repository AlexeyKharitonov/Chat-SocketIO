import { useEffect } from "react";
import { IMessage } from "../Types";

const UseScrollToBottom = (dependencyArray: IMessage[]) => {
  useEffect(() => {
    const element = document.querySelector(".scroll-container");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [dependencyArray]);
};

export default UseScrollToBottom;
