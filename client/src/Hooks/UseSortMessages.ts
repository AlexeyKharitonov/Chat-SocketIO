import { useState, useMemo } from "react";
import { options } from "./../Constants";
import { IMessage } from "../Types";

export const useSortMessages = (messages: IMessage[] | []) => {
  const [sortedType, setSortedType] = useState(options[1]);

  const sortedMessages = useMemo(() => {
    switch (sortedType) {
      case options[0]:
        return [...messages].sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        break;
      case options[1]:
        return [...messages].sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        break;
    }
  }, [messages, sortedType]);

  return { sortedMessages, setSortedType };
};
