export const CURRENT_USER = "currentUser";
export const USERS_IN_CHAT = "usersInChat";
export const MESSAGES_IN_CHAT = "messagesInChat";

export const MAINROOM = "mainroom";

export const options = ["Сначала старые", "Сначала новые"];

export const nicknameFormRules = {
  required: "Никнейм обязателен для заполнения",
  minLength: {
    value: 3,
    message: "Никнейм должен содержать минимум 3 символа",
  },
  maxLength: {
    value: 12,
    message: "Никнейм должен содержать максимум 12 символов",
  },
};
