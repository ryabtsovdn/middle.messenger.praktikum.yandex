import BaseAPI from './base-api';

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

  async getAll(data: ChatsOptions): Promise<ChatData[]> {
    const response = await this.http.get<ChatData[]>('/', {data});
    return response.data;
  }

  async addUser(data: ChatUsersData): Promise<void> {
    await this.http.put('/users', {data});
  }

  async removeUser(data: ChatUsersData): Promise<void> {
    await this.http.delete('/users', {data});
  }

  async getToken(chatId: number): Promise<string> {
    const response = await this.http.post<{token: string}>(`/token/${chatId}`);
    return response.data.token;
  }

  async getUsers(chatId: number): Promise<UserData[]> {
    const response = await this.http.get<UserData[]>(`/${chatId}/users`);
    return response.data;
  }
}
