import { IUser } from "../../Types";

export interface UsersState {
  users: IUser[];
  currentUser: null | IUser;
}
