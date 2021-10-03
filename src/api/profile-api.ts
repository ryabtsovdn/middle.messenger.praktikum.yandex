import BaseAPI from './base-api';

export class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user/profile');
  }

  create: undefined;

  read: undefined;

  async update(data: ProfileData): Promise<UserData> {
    const response = await this.http.put<UserData>('/', {data});
    return response.data;
  }

  delete: undefined;

  async changeAvatar(data: FormData): Promise<AvatarData> {
    const response = await this.http.put<AvatarData>('/avatar', {data});
    return response.data;
  }

  async changePassword(data: PasswordData): Promise<void> {
    await this.http.put<void>('/password', {data});
  }
}
