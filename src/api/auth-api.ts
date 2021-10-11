import BaseAPI from './base-api';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  create: undefined;

  async read(): Promise<UserData> {
    const response = await this.http.get<UserData>('/user');
    return response.data;
  }

  update: undefined;

  delete: undefined;

  async signin(data: SigninData): Promise<void> {
    await this.http.post('/signin', {data});
  }

  async signup(data: SignupData): Promise<UserID> {
    const response = await this.http.post<UserID>('/signup', {data});
    return response.data;
  }

  async logout(): Promise<void> {
    await this.http.post('/logout');
  }
}
