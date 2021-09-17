import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import {Validator} from '../../../utils/validator';
import serializeForm from '../../../utils/serialize-form';
import template from './signin-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './signin-form.css';

const tmpl = new Templator(template);

const validationRules = {
  login: Validator.DEFAULT.LOGIN,
  password: Validator.DEFAULT.PASSWORD,
};

const validator = new Validator({
  rules: validationRules,
});

export class SignInForm extends Block {
  constructor(props: {onSubmit?: () => void} = {}) {
    const {onSubmit} = props;
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();
          console.log(serializeForm(event.target as HTMLFormElement));

          const formInputs = (this as Block).element.querySelectorAll(
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

Templator.addPartial('organisms-signin-form', SignInForm);
