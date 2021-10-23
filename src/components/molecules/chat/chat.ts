import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import {RESOURCES_URL} from '../../../constants';
import defaultUserImg from '../../../img/default-user.svg';
import store from '../../../utils/store';
import './chat.css';

const tmpl = new Templator(`
  <div class="chat" data-index={{index}}>
    <div class="chat__avatar">
      <img src="{{avatar}}">
    </div>
    <div class="chat__info">
      <p class="chat__name">{{chat.title}}</p>
      <p class="chat__last">{{lastMessage}}</p>
      {{#if unread}}
        <p class="chat__unread">{{unread}}</p>
      {{/if}}
    </div>
  </div>
`);

export class Chat extends Block {
  initState(props: AnyObject): void {
    this.state = {
      unread: props.chat.unread_count || null,
      avatar: props.chat.avatar
        ? `${RESOURCES_URL}${props.chat.avatar}`
        : defaultUserImg,
      lastMessage: this.getLastMessage(props.chat),
      events: {
        click(): void {
          props.onClick(props.chat.id);
        },
      },
    };
  }

  componentDidMount(props: AnyObject): void {
    const storedChat = store.state.chats[props.chat.id];
    store.subscribe(storedChat.messages, () => {
      this.setState({
        unread: storedChat.unread_count || null,
        avatar: storedChat.avatar
          ? `${RESOURCES_URL}${storedChat.avatar}`
          : defaultUserImg,
        lastMessage: this.getLastMessage(storedChat),
      });
    });
  }

  getLastMessage(chat: ChatData & {messages: MessageData[]}): string {
    if (!chat.messages || !chat.messages.length) {
      return '';
    }

    const msg = chat.messages.slice(-1)[0];
    const prefix = msg.user_id === store.state.user.id ? 'Вы: ' : '';

    return `${prefix}${msg.content}`;
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      ...this.state,
    });
  }
}

Templator.addPartial('molecules-chat', Chat);
