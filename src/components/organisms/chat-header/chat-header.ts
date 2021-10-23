import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import store from '../../../utils/store';
import chatsController from '../../../controllers/chats-controller';
import {MenuButton} from './components/menu-button';
import {ChatMenu} from './components/chat-menu';
import '../../organisms/user-search-form';
import '../../molecules/chat-user';
import './chat-header.css';

const tmpl = new Templator(`
  <div class="chat-header">
    <ul class="chat-header__users">
      {{#each users}}
        <li class="chat-header__user">
          {{> molecules-chat-user user=#this isAdmin=.isAdmin}}
        </li>
      {{/each}}
    </ul>
    {{#if isAdmin}}
      {{menuButton}}
    {{/if}}
    {{#if showChatMenu}}
      {{chatMenu}}
    {{/if}}
    {{#if isAddingUser}}
      {{> templates-modal &content="organisms-user-search-form" .content=.addForm onClose=.closeForm}}
    {{/if}}
    {{#if isRemovingUser}}
      {{> templates-modal &content="organisms-user-search-form" .content=.removeForm onClose=.closeForm}}
    {{/if}}
  </div>
`);

export class ChatHeader extends Block {
  initState(): void {
    this.state = {
      showChatMenu: false,
      removeUser: this.removeUser.bind(this),
      addUser: this.addUser.bind(this),
      menuButton: new MenuButton({
        onClick: this.toggleChatMenu.bind(this),
      }),
      chatMenu: new ChatMenu({
        addUser: () => {
          this.setState({showChatMenu: false, isAddingUser: true});
        },
        removeUser: () => {
          this.setState({showChatMenu: false, isRemovingUser: true});
        },
      }),
      closeForm: (): void => {
        this.setState({isAddingUser: false, isRemovingUser: false});
      },
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

  toggleChatMenu(): void {
    this.setState({showChatMenu: !this.state.showChatMenu});
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
      addForm: {
        title: 'Добавить пользователя',
        onSelect: this.state.addUser,
        chatId: this.props.chatId,
        users: chat.users,
        filterUsers: (user: UserData) =>
          !chat.users.some((chatUser: UserData) => user.id === chatUser.id),
      },
      removeForm: {
        title: 'Удалить пользователя',
        onSelect: this.state.removeUser,
        chatId: this.props.chatId,
        users: chat.users,
        filterUsers: (user: UserData) =>
          chat.users.some((chatUser: UserData) => user.id === chatUser.id),
      },
      isAdmin: admin && admin.id === store.state.user.id,
    });
  }
}

Templator.addPartial('organisms-chat-header', ChatHeader);
