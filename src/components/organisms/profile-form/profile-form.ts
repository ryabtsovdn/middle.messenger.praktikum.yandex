import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './profile-form.tmpl';
import profileController, {
  validator,
} from '../../../controllers/profile-controller';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './profile-form.css';

const tmpl = new Templator(template);

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
