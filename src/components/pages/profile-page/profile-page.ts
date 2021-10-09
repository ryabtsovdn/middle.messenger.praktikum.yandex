import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import store from '../../../utils/store';
import {Router} from '../../../utils/router';
import authController from '../../../controllers/auth-controller';
import '../../atoms/link';
import '../../atoms/button';
import '../../organisms/avatar';
import '../../organisms/profile-form';
import '../../organisms/password-form';
import '../../organisms/avatar-form';
import '../../templates/modal-template';
import './profile-page.css';

const tmpl = new Templator(`
  <main class="profile-page">
    <aside class="profile-page__aside">
      {{> atoms-button className="button--arrow profile-page__back" text="" onClick=.onBack}}
    </aside>
    <article class="profile-page__content">
      {{> organisms-avatar className="profile-page__avatar" user=.user}}
      {{#if !state password}}
        {{> organisms-profile-form user=.user hideSubmit=.hideSubmit}}
      {{/if}}
      {{#if state password}}
        {{> organisms-password-form user=.user }}
      {{/if}}
      {{#if state profile}}
        <div class="profile-page__links">
          {{> atoms-link href="/settings/edit" className="profile-page__link" text="Изменить данные"}}
          {{> atoms-link href="/settings/password" className="profile-page__link" text="Изменить пароль"}}
          {{> atoms-link className="profile-page__link link_danger" text="Выйти" onClick=.onLogout}}
        </div>
      {{/if}}
      {{#if state avatar}}
        {{> templates-modal className="profile-page__avatar-modal" &content="organisms-avatar-form" onClose=.onCloseModal}}
      {{/if}}
    </article>
  </main>
`);

export class ProfilePage extends Block {
  initState(props: AnyObject): void {
    this.state = {
      ...props,
      hideSubmit: props.state === 'profile',
      user: store.state.user,
      onLogout: (event: MouseEvent) => {
        event.preventDefault();

        authController.logout();
      },
      onBack: () => {
        new Router().go('/messenger');
      },
      onCloseModal: () => {
        new Router().go('/settings');
      },
    };
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
    return tmpl.compile({
      ...this.props,
      ...this.state,
    });
  }
}
