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
}
