import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import serializeForm from '../../../utils/serialize-form';
import template from './chat-form.tmpl';
import chatsController from '../../../controllers/chats-controller';
import '../../atoms/input';
import './chat-form.css';

const tmpl = new Templator(template);

export class ChatForm extends Block {
  constructor(props: AnyObject) {
    super({
      ...props,
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
    });
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-chat-form', ChatForm);
