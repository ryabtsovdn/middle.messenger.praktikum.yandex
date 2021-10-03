import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './chat-page.tmpl';
import {Router} from '../../../utils/router';
import store from '../../../utils/store';
import authController from '../../../controllers/auth-controller';
import '../../atoms/link';
import '../../organisms/search-form';
import '../../organisms/chat-form';
import '../../organisms/chats-list';
import '../../organisms/messages-list';
import './chat-page.css';

const tmpl = new Templator(template);

const defaultMessages = [
  {text: 'Hi', direction: 'to', ts: Date.now()},
  {text: 'Hello', direction: 'from', ts: Date.now() - 100000},
  {text: 'Whazzup!', direction: 'from', ts: Date.now() - 200000},
];

export class ChatPage extends Block {
  constructor(props: UnknownObject = {}) {
    super(
      Object.assign(props, {
        activeChat: null,
        chats: store.state.chats,
        messages: null,
      })
    );
    const setActive = (index: number): void => {
      const activeChat = this.props.activeChat === index ? null : index;
      this.setProps({
        activeChat,
        messages:
          (activeChat && store.state.chats[activeChat].messages) ||
          defaultMessages,
      });
    };
    const send = (text: string): void => {
      console.log(text);
    };
    this.setProps({setActive, send});
  }

  async componentDidMount(): Promise<void> {
    await authController.getUser();

    store.subscribe(store.state.user, () => {
      if (!store.state.user) {
        new Router().go('/login');
      }
    });
  }

  render(): string {
    const compiled = tmpl.compile(this.props);
    return compiled;
  }
}
