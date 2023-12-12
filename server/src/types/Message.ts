import { User } from "./User.js";

export interface Message {
  sender: User;
  content: string;
  timestamp: Date;
}
