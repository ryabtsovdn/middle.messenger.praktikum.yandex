import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import {Router} from '../../../utils/router';
import store from '../../../utils/store';
import '../../atoms/link';
import '../../organisms/search-form';
import '../../organisms/chat-form';
import '../../organisms/chat-header';
import '../../organisms/chats-list';
import '../../organisms/messages-list';
import '../../organisms/create-chat-form';
import '../../templates/modal-template';
import './chat-page.css';

const tmpl = new Templator(`
  <main class="chat-page">
    <aside class="chat-page__sidebar">
      <div class="chat-page__menu">
        {{> atoms-link className="chat-page__menu-link" text="Создать чат" onClick=.toggleCreateChat}}
        {{> atoms-link className="chat-page__menu-link" href="/settings" text="Профиль >"}}
        {{#if isAddingChat}}
          {{> templates-modal &content="organisms-create-chat-form" .content=.createChatForm onClose=.toggleCreateChat}}
        {{/if}}
      </div>
      {{> organisms-search-form}}
      <div class="chat-page__chats">
        {{> organisms-chats-list active=.activeChat toggleActive=.toggleActive}}
      </div>
    </aside>
    <section class="chat-page__main {{#if activeChat}}chat-page__main--active{{/if}}">
      {{#if !activeChat}}
        <p class="chat-page__choose">Выберите чат чтобы отправить сообщение</p>
        <br>
        <h2>Ссылки на страницы ошибок:</h2>
        <ul>
          <li>{{> atoms-link href="/404" text="Страница не найдена"}}</li>
          <li>{{> atoms-link href="/500" text="Внутренняя ошибка"}}</li>
        </ul>
      {{/if}}
      {{#if activeChat}}
        <div class="chat-page__header">
          {{> organisms-chat-header chatId=.activeChat}}
        </div>
        <div class="chat-page__messages">
          {{> organisms-messages-list chatId=.activeChat}}
        </div>
        {{> organisms-chat-form chatId=.activeChat}}
      {{/if}}
    </section>
  </main>
`);

export class ChatPage extends Block {
  initState(): void {
    this.state = {
      isAddingChat: false,
      activeChat: null,
      createChatForm: {
        onSubmit: this.toggleCreateChat.bind(this),
      },
    };
  }

  async componentDidMount(): Promise<void> {
    if (!store.state.user) {
      new Router().go('/login');
    }
  }

  toggleCreateChat(): void {
    this.setState({isAddingChat: !this.state.isAddingChat});
  }

  toggleActive(id: number): void {
    const activeChat = this.state.activeChat === id ? null : id;
    if (activeChat) {
      store.state.chats[activeChat].unread_count = 0;
    }

    this.setState({
      activeChat,
    });
  }

  render(): string {
    return tmpl.compile({
      toggleActive: this.toggleActive.bind(this),
      toggleCreateChat: this.toggleCreateChat.bind(this),
      ...this.props,
      ...this.state,
    });
  }
}
