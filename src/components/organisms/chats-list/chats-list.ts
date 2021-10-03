import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './chats-list.tmpl';
import '../../molecules/chat';
import './chats-list.css';

const tmpl = new Templator(template);

export class ChatsList extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-chats-list', ChatsList);
