import BaseAPI from './base-api';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  create: undefined;

  async read(id: string): Promise<UserData> {
    const response = await this.http.get<UserData>(`/${id}`);
    return response.data;
  }

  update: undefined;

  delete: undefined;

  async search(
    data: {login: string},
    signal?: AbortSignal
  ): Promise<UserData[]> {
    const response = await this.http.post<UserData[]>('/search', {
      data,
      signal,
    });
    return response.data;
  }

  async changePassword(data: PasswordData): Promise<void> {
    await this.http.put<void>('/password', {data});
  }
}
