import { useState, useMemo } from "react";
import { Options } from "../Constants/";
import { IMessage } from "../Types";

export const useSortMessages = (messages: IMessage[] | []) => {
  const [sortedType, setSortedType] = useState<Options>(Options.NewestFirst);

  const sortedMessages = useMemo(() => {
    switch (sortedType) {
      case Options.OldestFirst:
        return [...messages].sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        break;
      case Options.NewestFirst:
        return [...messages].sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        break;
    }
  }, [messages, sortedType]);

  return { sortedMessages, setSortedType };
};
