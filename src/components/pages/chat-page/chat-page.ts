import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import {Router} from '../../../utils/router';
import store from '../../../utils/store';
import chatsController from '../../../controllers/chats-controller';
import '../../atoms/link';
import '../../organisms/search-form';
import '../../organisms/chat-form';
import '../../organisms/chat-header';
import '../../organisms/chats-list';
import '../../organisms/messages-list';
import './chat-page.css';

const tmpl = new Templator(`
  <main class="chat-page">
    <aside class="chat-page__sidebar">
      <div class="chat-page__menu">
        {{> atoms-link href="/settings" text="Создать чат" onClick=.addChat}}
        {{> atoms-link href="/settings" text="Профиль >"}}
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
      activeChat: null,
      addChat: async (event: MouseEvent): Promise<void> => {
        event.preventDefault();

        await chatsController.createChat(`${Date.now()}`);
      },

      toggleActive: (id: number): void => {
        const activeChat = this.state.activeChat === id ? null : id;

        this.setState({
          activeChat,
        });
      },
    };
  }

  async componentDidMount(): Promise<void> {
    if (!store.state.user) {
      new Router().go('/login');
    }
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      ...this.state,
    });
  }
}
