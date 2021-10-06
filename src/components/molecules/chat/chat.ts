import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './chat.tmpl';
import './chat.css';

const tmpl = new Templator(template);

export class Chat extends Block {
  constructor(props: AnyObject) {
    super({
      ...props,
      lastMessage: props.chat.last_message?.content,
      events: {
        click(): void {
          props.onClick(props.chat.id);
        },
      },
    });
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('molecules-chat', Chat);
