import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './password-form.tmpl';
import userController, {validator} from '../../../controllers/user-controller';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './password-form.css';

const tmpl = new Templator(template);

export class PasswordForm extends Block {
  constructor(props: AnyObject = {}) {
    super({
      ...props,
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          await userController.updatePassword(this.element as HTMLFormElement);
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

Templator.addPartial('organisms-password-form', PasswordForm);
