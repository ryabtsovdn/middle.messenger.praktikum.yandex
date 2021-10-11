import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import serializeForm from '../../../utils/serialize-form';
import chatsController from '../../../controllers/chats-controller';
import '../../atoms/input';
import './chat-form.css';

const tmpl = new Templator(`
  <form class="chat-form">
    {{> atoms-input className="chat-form__input" id="message" name="message" type="text" value=.value}}
    <label class="chat-form__label" for="message">Сообщение</label>
    {{> atoms-button className="button--arrow chat-from__button" text=""}}
  </form>
`);

export class ChatForm extends Block {
  initState(): void {
    this.state = {
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();

          const formData = serializeForm(this.element as HTMLFormElement);
          chatsController.sendMessage(this.props.chatId as number, {
            type: 'message',
            content: formData.message,
          });

          (this.element as HTMLFormElement).reset();
        },
      },
    };
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-chat-form', ChatForm);
