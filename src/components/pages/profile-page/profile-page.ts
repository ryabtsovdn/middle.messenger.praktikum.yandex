import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './profile-page.tmpl';
import store from '../../../utils/store';
import {Router} from '../../../utils/router';
import authController from '../../../controllers/auth-controller';
import '../../atoms/link';
import '../../organisms/avatar';
import '../../organisms/profile-form';
import '../../organisms/password-form';
import '../../organisms/avatar-form';
import '../../templates/modal-template';
import './profile-page.css';

const tmpl = new Templator(template);

export class ProfilePage extends Block {
  constructor(props: AnyObject = {}) {
    super({
      ...props,
      hideSubmit: props.state === 'profile',
      user: store.state.user,
      onLogout: (event: MouseEvent) => {
        event.preventDefault();

        authController.logout();
      },
    });
  }

  async componentDidMount(): Promise<void> {
    store.subscribe(store.state.user, () => {
      if (!store.state.user) {
        new Router().go('/login');
      }
    });

    await authController.getUser();
  }
  render(): string {
    return tmpl.compile(this.props);
  }
}
