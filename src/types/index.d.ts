/* eslint-disable camelcase */
type UUID = string;

type Nullable<T> = T | null;

type ValueOf<T> = T[keyof T];

type UnknownObject = Record<string, unknown>;

type AnyObject = Record<string, any>;

type FormElement = HTMLInputElement | HTMLTextAreaElement;

interface SigninData {
  login: string;
  password: string;
}

interface SignupData {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
}

type ProfileData = Omit<SignupData, 'password'>;

type UserData = ProfileData & {
  id: number;
  avatar: string;
  display_name: string;
  role?: string;
};

interface UserID {
  id: number;
}

type AvatarData = UserData & {status: Nullable<string>};

type PasswordData = {
  oldPassword: string;
  newPassword: string;
};

interface ChatsOptions {
  offset: number;
  limit?: number;
  title: string;
}

interface MessageData {
  user: UserData;
  time: string;
  content: string;
}

interface ChatData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: MessageData;
}

interface ChatDeleted {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
}

interface ChatUsersData {
  users: number[];
  chatId: number;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
