import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import profileController, {
  validator,
} from '../../../controllers/profile-controller';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './profile-form.css';

const fieldCls = 'form-field_inline validate';

const tmpl = new Templator(`
  <form class="profile-form">
    {{> molecules-form-field type="text" className="${fieldCls}" label="Почта" name="email" value=.user.email disabled=.hideSubmit}}
    {{> molecules-form-field type="text" className="${fieldCls}" label="Логин" name="login" value=.user.login disabled=.hideSubmit}}
    {{> molecules-form-field type="text" className="${fieldCls}" label="Имя" name="first_name" value=.user.first_name disabled=.hideSubmit}}
    {{> molecules-form-field type="text" className="${fieldCls}" label="Фамилия" name="second_name" value=.user.second_name disabled=.hideSubmit}}
    {{> molecules-form-field type="text" className="${fieldCls}" label="Имя в чате" name="display_name" value=.user.display_name disabled=.hideSubmit}}
    {{> molecules-form-field type="text" className="${fieldCls}" label="Телефон" name="phone" value=.user.phone disabled=.hideSubmit}}
    {{#if !hideSubmit}}
      {{> atoms-button className="profile-form__button" text="Сохранить"}}
    {{/if}}
  </form>
`);

export class ProfileForm extends Block {
  constructor(props: AnyObject = {}) {
    super({
      ...props,
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          await profileController.updateProfile(
            this.element as HTMLFormElement
          );
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

Templator.addPartial('organisms-profile-form', ProfileForm);
