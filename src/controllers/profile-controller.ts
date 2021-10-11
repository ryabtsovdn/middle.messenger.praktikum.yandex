import {ProfileAPI} from '../api/profile-api';
import {Router} from '../utils/router';
import {Validator} from '../utils/validator';
import serializeForm from '../utils/serialize-form';
import authController from './auth-controller';

const validationRules = {
  email: Validator.DEFAULT.EMAIL,
  login: Validator.DEFAULT.LOGIN,
  first_name: Validator.DEFAULT.NAME,
  second_name: Validator.DEFAULT.NAME,
  display_name: Validator.DEFAULT.LOGIN,
  phone: Validator.DEFAULT.PHONE,
};

export const validator = new Validator({
  rules: validationRules,
});

class ProfileController {
  private api: ProfileAPI;

  constructor() {
    this.api = new ProfileAPI();
  }

  async changeAvatar(data: FormData) {
    try {
      await this.api.changeAvatar(data);
      await authController.getUser();
      new Router().go('/settings');
    } catch (e) {
      console.log(e);
    }
  }

  async changeUser(data: ProfileData) {
    try {
      await this.api.update(data);
      await authController.getUser();
      new Router().go('/settings');
    } catch (e) {
      console.log(e);
    }
  }

  async updateProfile(form: HTMLFormElement) {
    const formData = serializeForm(form) as ProfileData;
    console.log(formData);

    if (validator.validateForm(form)) {
      await this.changeUser(formData);
    }
  }
}

export default new ProfileController();
