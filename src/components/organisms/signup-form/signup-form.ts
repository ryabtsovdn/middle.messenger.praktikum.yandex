import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './signup-form.css';
import registerController, {
  validator,
} from '../../../controllers/register-controller';

const tmpl = new Templator(`
  <form class="auth-form">
    <h2 class="auth-form__title">Регистрация</h2>
    {{> molecules-form-field className="validate" type="text" name="email" label="Почта"}}
    {{> molecules-form-field className="validate" type="text" name="login" label="Логин"}}
    {{> molecules-form-field className="validate" type="text" name="first_name" label="Имя"}}
    {{> molecules-form-field className="validate" type="text" name="second_name" label="Фамилия"}}
    {{> molecules-form-field className="validate" type="tel" name="phone" label="Телефон"}}
    {{> molecules-form-field className="validate" type="password" name="password" label="Пароль"}}
    {{> molecules-form-field className="validate" type="password" name="password_confirm" label="Подтвердить пароль"}}
    <div class="auth-form__buttons signup-form__buttons">
      {{> atoms-button className="auth-form__button" text="Зарегистрироваться"}}
      {{> atoms-link text="Войти" className="auth-form__link" href="/login"}}
    </div>
  </form>
`);

export class SignUpForm extends Block {
  initState(): void {
    this.state = {
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          await registerController.register(this.element as HTMLFormElement);
        },
        focusout: (event: FocusEvent) => {
          validator.validate(event.target as FormElement);
        },
      },
    };
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-signup-form', SignUpForm);
