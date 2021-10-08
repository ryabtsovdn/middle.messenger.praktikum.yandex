import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import store from '../../../utils/store';
import chatsController from '../../../controllers/chats-controller';
import '../../organisms/user-search-form';
import '../../molecules/chat-user';
import './chat-header.css';

const tmpl = new Templator(`
  <div class="chat-header">
    <ul class="chat-header__users">
      {{#each users}}
        <li class="chat-header__user">
          {{> molecules-chat-user user=#this onRemove=.removeUser isAdmin=.isAdmin}}
        </li>
      {{/each}}
    </ul>
    {{#if isAdmin}}
      {{> organisms-user-search-form chatId=.chatId onSelect=.addUser users=.users}}
    {{/if}}
  </div>
`);

export class ChatHeader extends Block {
  initState(): void {
    this.state = {
      removeUser: this.removeUser.bind(this),
      addUser: this.addUser.bind(this),
    };
  }

  componentDidMount(): void {
    const {chatId} = this.props;
    const chat = store.state.chats[chatId];

    store.subscribe(chat, () => {
      this.forceUpdate();
    });

    if (!chat.users) {
      chatsController.syncChatUsers(chatId);
    }
  }

  async removeUser(id: number): Promise<void> {
    await chatsController.removeUser(this.props.chatId, id);
  }

  async addUser(id: number): Promise<void> {
    await chatsController.addUser(this.props.chatId, id);
  }

  render(): string {
    const chat = store.state.chats[this.props.chatId];
    const admin = chat.users?.find((u: UserData) => u.role === 'admin');

    return tmpl.compile({
      ...this.props,
      ...this.state,
      users: chat.users,
      isAdmin: admin && admin.id === store.state.user.id,
    });
  }
}

Templator.addPartial('organisms-chat-header', ChatHeader);
