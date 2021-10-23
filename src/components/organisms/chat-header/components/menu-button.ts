import {Block} from '../../../../utils/block';

export class MenuButton extends Block {
  initState(props: AnyObject = {}): void {
    this.state = {
      events: {
        click: props.onClick,
      },
    };
  }

  render(): string {
    return `<button class="chat-header__menu-open"></button>`;
  }
}
