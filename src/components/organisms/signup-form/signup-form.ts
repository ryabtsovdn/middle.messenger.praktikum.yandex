import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './signup-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './signup-form.css';
import registerController, {
  validator,
} from '../../../controllers/register-controller';

const tmpl = new Templator(template);

export class SignUpForm extends Block {
  constructor(props: AnyObject = {}) {
    super({
      ...props,
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          await registerController.register(this.element as HTMLFormElement);
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

Templator.addPartial('organisms-signup-form', SignUpForm);
