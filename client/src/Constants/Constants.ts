import { INicknameFormRules } from "./Constants.type";

export const CURRENT_USER = "currentUser";
export const USERS_IN_CHAT = "usersInChat";
export const MESSAGES_IN_CHAT = "messagesInChat";

export const MAINROOM = "mainroom";

export enum Options {
  OldestFirst = "Сначала старые",
  NewestFirst = "Сначала новые",
}

export const nicknameFormRules: INicknameFormRules = {
  required: "Никнейм обязателен для заполнения",
  minLength: {
    value: 3,
    message: "Никнейм должен содержать минимум 3 символа",
  },
  maxLength: {
    value: 13,
    message: "Никнейм должен содержать максимум 13 символов",
  },
};
