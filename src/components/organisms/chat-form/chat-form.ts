import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import serializeForm from '../../../utils/serialize-form';
import template from './chat-form.tmpl';
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
          console.log(serializeForm(event.target as HTMLFormElement));
        },
      },
    });
  }
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-chat-form', ChatForm);
