import {UserAPI} from '../api/user-api';
import {Router} from '../utils/router';
import {Validator} from '../utils/validator';
import serializeForm from '../utils/serialize-form';

const validationRules = {
  oldPassword: Validator.DEFAULT.PASSWORD,
  newPassword: Validator.DEFAULT.PASSWORD,
  newPasswordConfirm: Validator.DEFAULT.PASSWORD,
};

export const validator = new Validator({
  rules: validationRules,
});

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async changePassword(data: PasswordData) {
    try {
      await this.api.changePassword(data);
      new Router().go('/settings');
    } catch (e) {
      console.log(e);
    }
  }

  async updatePassword(form: HTMLFormElement) {
    const formData = serializeForm(form) as PasswordData;
    console.log(formData);

    if (validator.validateForm(form)) {
      await this.changePassword(formData);
    }
  }

  async search(login: string, signal?: AbortSignal): Promise<UserData[]> {
    const users = await this.api.search({login}, signal);
    return users;
  }
}

export default new UserController();
