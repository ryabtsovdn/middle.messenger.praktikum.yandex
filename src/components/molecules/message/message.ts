import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './message.tmpl';
import store from '../../../utils/store';
import './message.css';

const tmpl = new Templator(template);

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
