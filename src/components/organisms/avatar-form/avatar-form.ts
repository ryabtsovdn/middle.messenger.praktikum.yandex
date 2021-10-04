import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './avatar-form.tmpl';
import profileController from '../../../controllers/profile-controller';
import serializeForm from '../../../utils/serialize-form';
import '../../molecules/file-field';
import '../../atoms/button';
import './avatar-form.css';

const tmpl = new Templator(template);

export class AvatarForm extends Block {
  constructor(props: AnyObject = {}) {
    super({
      ...props,
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          const formData = new FormData(this.element as HTMLFormElement);
          console.log(serializeForm(this.element as HTMLFormElement));

          await profileController.changeAvatar(formData);
        },
      },
    });
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-avatar-form', AvatarForm);
