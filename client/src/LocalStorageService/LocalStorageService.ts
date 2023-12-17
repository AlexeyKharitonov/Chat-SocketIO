import { CURRENT_USER, MESSAGES_IN_CHAT, USERS_IN_CHAT } from "../Constants/";
import { IMessage, IUser } from "../Types";

const addMessage = (message: IMessage) => {
  const allMessages = localStorage.getItem(MESSAGES_IN_CHAT);

  if (allMessages) {
    const arrMessages = JSON.parse(allMessages);
    arrMessages.push(message);
    localStorage.setItem(MESSAGES_IN_CHAT, JSON.stringify(arrMessages));
  } else {
    localStorage.setItem(MESSAGES_IN_CHAT, JSON.stringify([message]));
  }
};

const addUser = (user: IUser) => {
  const allUsers = localStorage.getItem(USERS_IN_CHAT);

  if (allUsers) {
    const arrUsers = JSON.parse(allUsers);
    arrUsers.push(user);
    localStorage.setItem(USERS_IN_CHAT, JSON.stringify(arrUsers));
  } else {
    localStorage.setItem(USERS_IN_CHAT, JSON.stringify([user]));
  }
};

const getAllMessages = (): IMessage[] | null | undefined => {
  const messagesJson = localStorage.getItem(MESSAGES_IN_CHAT);
  if (messagesJson) {
    return JSON.parse(messagesJson);
  }
};

const removeAllMessages = () => {
  localStorage.removeItem(MESSAGES_IN_CHAT);
};

const updatedUsers = (updateUsers: IUser[]) =>
  localStorage.setItem(USERS_IN_CHAT, JSON.stringify(updateUsers));

const getAllUsers = (): IUser[] | null | undefined => {
  const usersJson = localStorage.getItem(USERS_IN_CHAT);
  if (usersJson) {
    return JSON.parse(usersJson);
  }
};

const addCurrentUser = (currentUser: IUser) =>
  localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));

const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(CURRENT_USER) ?? "null");

const removeUser = () => {
  const users = localStorage.getItem(USERS_IN_CHAT);
  const currentUser = localStorage.getItem(CURRENT_USER);

  if (users && currentUser) {
    const arrUsers = JSON.parse(users);
    const targetUser = JSON.parse(currentUser);
    const newUsers =
      [] || arrUsers.filter((user: IUser) => user.id !== targetUser.id);
    localStorage.setItem(USERS_IN_CHAT, JSON.stringify(newUsers));

    localStorage.removeItem(CURRENT_USER);
  }
};

export const localStorageService = {
  addMessage,
  getAllMessages,
  removeAllMessages,
  addUser,
  updatedUsers,
  getAllUsers,
  addCurrentUser,
  getCurrentUser,
  removeUser,
};
