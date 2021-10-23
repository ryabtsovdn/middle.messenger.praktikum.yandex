import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import {RESOURCES_URL} from '../../../constants';
import defaultUserImg from '../../../img/default-user.svg';
import './chat-user.css';

const tmpl = new Templator(`
  <div class="chat-user">
    <div class="chat-user__avatar">
      <img src="{{avatar}}">
    </div>
    {{user.first_name}}
    {{user.second_name}}
    ({{user.login}})
  </div>
`);

export class ChatUser extends Block {
  init(props: AnyObject): AnyObject {
    return {
      avatar: props.user.avatar
        ? `${RESOURCES_URL}${props.user.avatar}`
        : defaultUserImg,
    };
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      ...this.state,
    });
  }
}

Templator.addPartial('molecules-chat-user', ChatUser);
