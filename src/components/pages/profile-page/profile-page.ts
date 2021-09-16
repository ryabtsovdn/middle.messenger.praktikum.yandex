import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import serializeForm from '../../../utils/serialize-form';
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
  phone: '+7 (999) 999 99 99',
  avatar,
};

export class ProfilePage extends Block {
  componentDidMount(props: AnyObject): void {
    this.setProps({
      hideSubmit: props.state === 'profile',
      user,
      form: {
        events: {
          submit: function (event: SubmitEvent) {
            event.preventDefault();
            console.log(serializeForm(event.target as HTMLFormElement));
            window.history.pushState(null, '', '/profile');
            dispatchEvent(new PopStateEvent('popstate'));
          },
        },
      },
    });
  }
  render(): string {
    return tmpl.compile(this.props);
  }
}
