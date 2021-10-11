import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import userController, {validator} from '../../../controllers/user-controller';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './password-form.css';

const fieldCls = `form-field_inline validate`;

const tmpl = new Templator(`
  <form class="profile-form">
    {{> molecules-form-field type="password" className="${fieldCls}" label="Старый пароль" name="oldPassword"}}
    {{> molecules-form-field type="password" className="${fieldCls}" label="Новый пароль" name="newPassword"}}
    {{> molecules-form-field type="password" className="${fieldCls}" label="Подтвердите новый пароль" name="newPasswordConfirm"}}
    {{#if !form.hideSubmit}}
      {{> atoms-button className="profile-form__button" text="Сохранить"}}
    {{/if}}
  </form>
`);

export class PasswordForm extends Block {
  initState(): void {
    this.state = {
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          await userController.updatePassword(this.element as HTMLFormElement);
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

Templator.addPartial('organisms-password-form', PasswordForm);
