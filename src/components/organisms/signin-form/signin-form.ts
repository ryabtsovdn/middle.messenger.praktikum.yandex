import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import loginController, {
  validator,
} from '../../../controllers/login-controller';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './signin-form.css';

const tmpl = new Templator(`
  <form class="auth-form">
    <h2 class="auth-form__title">Вход</h2>
    {{> molecules-form-field className="validate" type="text" name="login" label="Логин"}}
    {{> molecules-form-field className="validate" type="password" name="password" label="Пароль"}}
    <div class="auth-form__buttons signin-form__buttons">
      {{> atoms-button className="auth-form__button" text="Войти"}}
      {{> atoms-link href="/sign-up" text="Нет аккаунта?" className="auth-form__link"}}
    </div>
  </form>
`);

export class SignInForm extends Block {
  constructor(props: AnyObject = {}) {
    super({
      ...props,
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          await loginController.login(this.element as HTMLFormElement);
        },
        focusout: (event: FocusEvent) => {
          validator.validate(event.target as FormElement);
        },
      },
    });
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-signin-form', SignInForm);
