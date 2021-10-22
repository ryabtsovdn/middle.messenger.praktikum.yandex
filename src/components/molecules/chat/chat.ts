import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import {RESOURCES_URL} from '../../../constants';
import defaultUserImg from '../../../img/default-user.svg';
import './chat.css';

const tmpl = new Templator(`
  <div class="chat" data-index={{index}}>
    <div class="chat__avatar">
      <img src="{{avatar}}">
    </div>
    <div class="chat__info">
      <p class="chat__name">{{chat.title}}</p>
      <p class="chat__last">{{lastMessage}}</p>
    </div>
  </div>
`);

export class Chat extends Block {
  initState(props: AnyObject): void {
    this.state = {
      avatar: props.chat.avatar
        ? `${RESOURCES_URL}${props.chat.avatar}`
        : defaultUserImg,
      lastMessage: props.chat.last_message?.content,
      events: {
        click(): void {
          props.onClick(props.chat.id);
        },
      },
    };
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      ...this.state,
    });
  }
}

Templator.addPartial('molecules-chat', Chat);
