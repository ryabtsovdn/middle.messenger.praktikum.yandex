import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import profileController from '../../../controllers/profile-controller';
import serializeForm from '../../../utils/serialize-form';
import '../../molecules/file-field';
import '../../atoms/button';
import './avatar-form.css';

const tmpl = new Templator(`
  <form class="avatar-form" enctype="multipart/form-data">
    <h2 class="avatar-form__title">Загрузите файл</h2>
    {{> molecules-file-field name="avatar" id="avatar-upload"}}
    {{> atoms-button className="avatar-form__button" text="Поменять"}}
  </form>
`);

export class AvatarForm extends Block {
  initState(): void {
    this.state = {
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          const formData = new FormData(this.element as HTMLFormElement);
          console.log(serializeForm(this.element as HTMLFormElement));

          await profileController.changeAvatar(formData);
        },
      },
    };
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      ...this.state,
    });
  }
}

Templator.addPartial('organisms-avatar-form', AvatarForm);
