export const DEFAULT_SESSION_TIME = 3 * 24 * 60 * 60 * 1000; // 3 days in ms
export const PROTECTED_SESSION_TIME = 2 * 3600; // 2 hours in sec
export const ERROR_SERVER = "Внутренняя ошибка сервера, попробуйте позже!";
export const SERVER_UNAVAILABLE = "Связь с сервером потеряна!";
export const ERROR_AUTHORIZATION = "Неверное имя пользователя или пароль!";
export const PASSWORD_MAX_LENGTH = 35;
export const PASSWORD_MIN_LENGTH = 5;
export const EMPTY_EMAIL_FIELD = "Email не может быть пустым!";
export const EMPTY_PASSWORD_FIELD = "Пароль не может быть пустым!";
export const ERROR_EMAIL_FIELD = "Некорректный email!";
export const ERROR_PASSWORD_FIELD = `Длина пароля должна быть от ${PASSWORD_MIN_LENGTH} до ${PASSWORD_MAX_LENGTH} символов!`;

export const USER_TYPE_STUDENT = "student";
export const USER_TYPE_PROFESSOR = "professor";
export const USER_TYPE_ADMIN = "admin";
export const USER_TYPE_METHODIST = "methodist";
export const USER_TYPE_GUEST = "guest";