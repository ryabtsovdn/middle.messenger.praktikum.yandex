import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import {RESOURCES_URL} from '../../../constants';
import './avatar.css';

const tmpl = new Templator(`
  <a href="/settings/avatar" class="avatar {{className}}">
    <div class="avatar__img">
      <img src="{{avatar}}" crossorigin="use-credentials">
      <div class="avatar__overlay">
        <span>Поменять аватар</span>
      </div>
    </div>
    <p class="avatar__name">
      {{user.displayName}}
    </p>
  </a>
`);

export class Avatar extends Block {
  initState(props: AnyObject): void {
    this.state = {
      avatar: `${RESOURCES_URL}${props.user.avatar}`,
    };
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      ...this.state,
    });
  }
}

Templator.addPartial('organisms-avatar', Avatar);
