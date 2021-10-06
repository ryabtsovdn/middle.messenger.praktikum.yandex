import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './messages-list.tmpl';
import store from '../../../utils/store';
import '../../molecules/message';
import './messages-list.css';

const tmpl = new Templator(template);

export class MessagesList extends Block {
  constructor(props: AnyObject = {}) {
    super(props);

    store.subscribe(store.state.chats[props.chatId].messages, () => {
      this.forceUpdate();
    });
  }

  sortMessages(a: MessageData, b: MessageData): number {
    if (a.time === b.time) {
      return 0;
    }
    return a.time > b.time ? -1 : 1;
  }

  getSortedMessages(): MessageData[] {
    const messages = store.state.chats[this.props.chatId].messages;
    return messages.slice().sort(this.sortMessages);
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      messages: this.getSortedMessages(),
    });
  }
}

Templator.addPartial('organisms-messages-list', MessagesList);
