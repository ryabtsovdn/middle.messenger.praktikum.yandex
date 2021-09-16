import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './chat-page.tmpl';
import '../../atoms/link';
import './chat-page.css';

const tmpl = new Templator(template);

export class ChatPage extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}
