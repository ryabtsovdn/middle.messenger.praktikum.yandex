import {Block} from '../../../utils/block';
import {Templator} from '../../../utils/templator';
import '../../atoms/button';
import '../../molecules/form-field';
import './create-chat-form.css';

const tmpl = new Templator(`
  <form class="create-chat-form">
    <h2 class="create-chat-form__title">Создать чат</h2>
    {{> molecules-form-field type="text" name="title" label="Имя чата"}}
    {{> atoms-button className="create-chat-form__button" text="Создать"}}
  </form>
`);

export class CreateChatForm extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-create-chat-form', CreateChatForm);
