import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import store from '../../../utils/store';
import './message.css';

const tmpl = new Templator(`
  <div class="message message--{{direction}}">
    <div class="message__text">{{message.content}}</div>
    <span class="message__date">{{time}}</span>
  </div>
`);

export class Message extends Block {
  render(): string {
    const {message} = this.props;
    const direction =
      message.user_id === store.state.user.id ? 'outcoming' : 'incoming';
    const time = new Date(message.time)
      .toLocaleTimeString()
      .replace(/(?<=^\d{1,2}:\d{2}):\d{2}/, '');

    return tmpl.compile({...this.props, direction, time});
  }
}

Templator.addPartial('molecules-message', Message);
