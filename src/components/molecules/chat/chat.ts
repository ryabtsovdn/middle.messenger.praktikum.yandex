import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './chat.tmpl';
import './chat.css';

const tmpl = new Templator(template);

export class Chat extends Block {
  constructor(props: AnyObject) {
    super({
      ...props,
      events: {
        click(): void {
          props.onClick(props.index);
        },
      },
    });
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('molecules-chat', Chat);
