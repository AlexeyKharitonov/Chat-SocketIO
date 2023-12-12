export interface IUser {
  id: string;
  nickName: null | string;
}

export interface IMessage {
  sender: IUser;
  content: string;
  timestamp: number;
}

export interface formData {
  nickName: string;
}
