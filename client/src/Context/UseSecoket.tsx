import { createContext, useContext } from "react";
import io, { Socket } from "socket.io-client";
import configFile from "../config.json";

const SocketContext = createContext<Socket>(undefined!);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const Socket = io(configFile.apiEndpoint);

  return (
    <SocketContext.Provider value={Socket}>{children}</SocketContext.Provider>
  );
};
