export interface IUser {
  id: string;
  nickName: string;
  socketId?: string;
}

export interface IMessage {
  sender: IUser;
  content: string;
  timestamp: Date;
}
