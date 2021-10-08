import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import './chat-user.css';

const tmpl = new Templator(`
  <div class="chat-user">
    {{user.first_name}}
    {{user.second_name}}
    {{#if canRemove}}
      <button class="chat-user__remove"></button>
    {{/if}}
  </div>
`);

export class ChatUser extends Block {
  constructor(props: AnyObject = {}) {
    super({
      ...props,
      events: {
        click: async (event: MouseEvent) => {
          const el = event.target as HTMLElement;
          if (el.tagName === 'BUTTON') {
            (el as HTMLButtonElement).disabled = true;
            await props.onRemove(props.user.id);
            (el as HTMLButtonElement).disabled = false;
          }
        },
      },
    });
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      canRemove: this.props.isAdmin && this.props.user.role !== 'admin',
    });
  }
}

Templator.addPartial('molecules-chat-user', ChatUser);
