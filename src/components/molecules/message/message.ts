import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './message.tmpl';
import './message.css';

const tmpl = new Templator(template);

interface IMessage {
  text: string;
  direction: 'from' | 'to';
  ts: number;
}

export class Message extends Block {
  constructor(props: UnknownObject) {
    const dateObj = new Date((props.message as IMessage).ts);
    const date =
      `0${dateObj.getHours()}`.slice(-2) +
      ':' +
      `0${dateObj.getMinutes()}`.slice(-2);
    super({...props, date});
  }
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('molecules-message', Message);
