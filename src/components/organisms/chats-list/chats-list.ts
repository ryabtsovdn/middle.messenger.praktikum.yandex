import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import store from '../../../utils/store';
import '../../molecules/chat';
import './chats-list.css';

const tmpl = new Templator(`
  <ul class="chats-list">
    {{#each chats}}
      <li class="chats-list__item">
        {{> molecules-chat chat=#this index=#index active=.active onClick=.toggleActive}}
      </li>
    {{/each}}
  </ul>
`);

export class ChatsList extends Block {
  constructor(props: AnyObject = {}) {
    super(props);

    store.subscribe(store.state.chats, () => {
      this.forceUpdate();
    });
  }

  sortChats(a: ChatData, b: ChatData): number {
    if (!a.last_message && !b.last_message) {
      return a.id > b.id ? -1 : 1;
    }

    if (!a.last_message) {
      return -1;
    }

    if (!b.last_message) {
      return 1;
    }

    return a.last_message.time > b.last_message.time ? -1 : 1;
  }

  getSortedChats(): ChatData[] {
    const chats = Object.values(store.state.chats || {}) as ChatData[];
    return chats.sort(this.sortChats);
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      chats: this.getSortedChats(),
    });
  }
}

Templator.addPartial('organisms-chats-list', ChatsList);
