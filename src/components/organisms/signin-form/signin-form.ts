import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './signin-form.tmpl';
import loginController, {
  validator,
} from '../../../controllers/login-controller';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './signin-form.css';

const tmpl = new Templator(template);

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
