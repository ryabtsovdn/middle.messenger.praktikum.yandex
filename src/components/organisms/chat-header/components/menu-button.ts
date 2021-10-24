import {Block} from '../../../../utils/block';

export class MenuButton extends Block {
  init(props: AnyObject = {}): AnyObject {
    return {
      events: {
        click: props.onClick,
      },
    };
  }

  render(): string {
    return `<button class="chat-header__menu-open"></button>`;
  }
}
