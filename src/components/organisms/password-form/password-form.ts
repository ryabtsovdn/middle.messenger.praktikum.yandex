import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import {Validator} from '../../../utils/validator';
import serializeForm from '../../../utils/serialize-form';
import template from './password-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './password-form.css';

const tmpl = new Templator(template);

const validationRules = {
  oldPassword: Validator.DEFAULT.PASSWORD,
  newPassword: Validator.DEFAULT.PASSWORD,
  newPasswordConfirm: Validator.DEFAULT.PASSWORD,
};

const validator = new Validator({
  rules: validationRules,
});

export class PasswordForm extends Block {
  constructor(props: {onSubmit?: () => void} = {}) {
    const {onSubmit} = props;
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();
          console.log(serializeForm(event.target as HTMLFormElement));

          const formInputs = (this.element as HTMLElement).querySelectorAll(
            '.form-field__input'
          ) as NodeListOf<FormElement>;

          const isValid = validator.validateAll([...formInputs]);

          if (isValid && onSubmit) {
            onSubmit();
          }
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
