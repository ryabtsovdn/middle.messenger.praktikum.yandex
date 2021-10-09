import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import store from '../../../utils/store';
import './message.css';

const tmpl = new Templator(`
  <div class="message message--{{direction}}">
    <div class="message__text">{{message.content}}</div>
    <span class="message__date">{{message.time}}</span>
  </div>
`);

export class Message extends Block {
  render(): string {
    const direction =
      this.props.message.user_id === store.state.user.id
        ? 'outcoming'
        : 'incoming';
    return tmpl.compile({...this.props, direction});
  }
}

Templator.addPartial('molecules-message', Message);
