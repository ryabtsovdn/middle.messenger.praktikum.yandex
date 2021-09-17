import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './chat-page.tmpl';
import avatar from 'url:../../../../static/img/default-user.svg';
import '../../atoms/link';
import '../../organisms/search-form';
import '../../organisms/chat-form';
import '../../organisms/contacts-list';
import '../../organisms/messages-list';
import './chat-page.css';

const tmpl = new Templator(template);

const contacts = [
  {
    name: 'Андрей',
    avatar,
    messages: [
      {text: 'Hi', direction: 'to', ts: Date.now()},
      {text: 'Hello', direction: 'from', ts: Date.now() - 100000},
      {text: 'Whazzup!', direction: 'from', ts: Date.now() - 200000},
    ],
  },
  {
    name: 'Илья',
    avatar,
    messages: [
      {text: 'Good morning', direction: 'to', ts: Date.now()},
      {text: 'Hi', direction: 'from', ts: Date.now() - 100000},
      {text: 'How is it going?', direction: 'from', ts: Date.now() - 200000},
    ],
  },
];

export class ChatPage extends Block {
  constructor(props: UnknownObject = {}) {
    super(
      Object.assign(props, {
        activeChat: null,
        contacts,
        messages: null,
      })
    );
    const setActive = (index: number): void => {
      const activeChat = this.props.activeChat === index ? null : index;
      this.setProps({
        activeChat,
        messages: activeChat && contacts[activeChat].messages,
      });
    };
    const send = (text: string): void => {
      const active = this.props.activeChat as number;
      contacts[active].messages.push({text, direction: 'to', ts: Date.now()});
    };
    this.setProps({setActive, send});
  }

  render(): string {
    const compiled = tmpl.compile(this.props);
    return compiled;
  }
}
