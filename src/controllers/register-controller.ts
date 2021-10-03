import authController from './auth-controller';
import {Validator} from '../utils/validator';
import serializeForm from '../utils/serialize-form';

const validationRules = {
  email: Validator.DEFAULT.EMAIL,
  login: Validator.DEFAULT.LOGIN,
  first_name: Validator.DEFAULT.NAME,
  second_name: Validator.DEFAULT.NAME,
  phone: Validator.DEFAULT.PHONE,
  password: Validator.DEFAULT.PASSWORD,
  password_confirm: Validator.DEFAULT.PASSWORD,
};

export const validator = new Validator({
  rules: validationRules,
});

class RegisterController {
  async register(form: HTMLFormElement) {
    const formData = serializeForm(form) as SignupData;
    console.log(formData);

    if (validator.validateForm(form)) {
      await authController.signup(formData);
    }
  }
}

export default new RegisterController();
