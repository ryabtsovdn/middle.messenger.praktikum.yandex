import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './chat-page.tmpl';
import {Router} from '../../../utils/router';
import store from '../../../utils/store';
import chatsController from '../../../controllers/chats-controller';
import '../../atoms/link';
import '../../organisms/search-form';
import '../../organisms/chat-form';
import '../../organisms/chats-list';
import '../../organisms/messages-list';
import './chat-page.css';

const tmpl = new Templator(template);

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
