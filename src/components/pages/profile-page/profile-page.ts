import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './profile-page.tmpl';
import avatar from 'url:../../../../static/img/default-user.svg';
import '../../atoms/link';
import '../../organisms/avatar';
import '../../organisms/profile-form';
import '../../organisms/password-form';
import '../../organisms/avatar-form';
import '../../templates/modal-template';
import './profile-page.css';

const tmpl = new Templator(template);

const user = {
  email: 'email@yandex.ru',
  login: 'ivanivanov',
  firstName: 'Иван',
  secondName: 'Иванов',
  displayName: 'Иван',
  phone: '+79999999999',
  avatar,
};

export class ProfilePage extends Block {
  componentDidMount(props: AnyObject): void {
    this.setProps({
      hideSubmit: props.state === 'profile',
      user,
      form: {
        onSubmit: () => {
          window.history.pushState(null, '', '/settings');
          dispatchEvent(new PopStateEvent('popstate'));
        },
      },
    });
  }
  render(): string {
    return tmpl.compile(this.props);
  }
}
