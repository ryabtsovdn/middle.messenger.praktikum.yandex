/* eslint-disable camelcase */
import BaseAPI from './base-api';

interface ChatsOptions {
  offset: number;
  limit: number;
  title: string;
}

interface MessageData {
  user: UserData;
  time: string;
  content: string;
}

interface ChatData {
  id: string;
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

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  async create(data: {title: string}): Promise<void> {
    await this.http.post('/', {data});
  }

  read: undefined;

  update: undefined;

  async delete(data: {chatId: number}): Promise<ChatDeleted> {
    const response = await this.http.delete<ChatDeleted>('/', {data});
    return response.data;
  }

  async chats(data: ChatsOptions): Promise<ChatData[]> {
    const response = await this.http.get<ChatData[]>('/', {data});
    return response.data;
  }

  async addUser(data: ChatUsersData): Promise<void> {
    await this.http.put('/users', {data});
  }

  async removeUser(data: ChatUsersData): Promise<void> {
    await this.http.delete('/users', {data});
  }
}
