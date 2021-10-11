import authController from './auth-controller';
import {Validator} from '../utils/validator';
import serializeForm from '../utils/serialize-form';

const validationRules = {
  login: Validator.DEFAULT.LOGIN,
  password: Validator.DEFAULT.PASSWORD,
};

export const validator = new Validator({
  rules: validationRules,
});

class LoginController {
  async login(form: HTMLFormElement) {
    const formData = serializeForm(form) as SigninData;
    console.log(formData);

    if (validator.validateForm(form)) {
      await authController.signin(formData);
    }
  }
}

export default new LoginController();
