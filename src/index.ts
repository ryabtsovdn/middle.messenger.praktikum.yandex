import {LoginPage} from './components/pages/login-page';
import {ChatPage} from './components/pages/chat-page';
import {RegisterPage} from './components/pages/register-page';
import {ProfilePage} from './components/pages/profile-page';
import {ErrorPage} from './components/pages/error-page';
import avatar from 'url:../static/img/default-user.svg';

const root = document.getElementById('root');

const user = {
  email: 'email@yandex.ru',
  login: 'ivanivanov',
  firstName: 'Иван',
  secondName: 'Иванов',
  displayName: 'Иван',
  phone: '+7 (999) 999 99 99',
  avatar,
};

const onSubmit = function (ev: Event) {
  ev.preventDefault();
  navigate('/');
};

const onSave = function (ev: Event) {
  ev.preventDefault();
  navigate('/profile');
};

export interface IBlock {
  getContent: () => HTMLElement;
}

const routes: Record<string, IBlock> = {
  '/': new ChatPage({}),
  '/login': new LoginPage({page: {onSubmit}}),
  '/register': new RegisterPage({page: {onSubmit}}),
  '/profile': new ProfilePage({
    page: {state: 'profile'},
    form: {hideSubmit: true},
    user,
  }),
  '/profile/edit': new ProfilePage({page: {state: 'edit', onSave}, user}),
  '/profile/password': new ProfilePage({
    page: {state: 'password', onSave},
    user,
  }),
  '/profile/avatar': new ProfilePage({page: {state: 'avatar', onSave}, user}),
  '/500': new ErrorPage({code: 500, message: 'Мы уже фиксим'}),
  '/404': new ErrorPage({code: 404, message: 'Не туда попали'}),
};

const navigate = async (path?: string) => {
  const page = routes[path || location.pathname] || routes['/404'];
  root.innerHTML = '';
  root.append(page.getContent());
};

window.onpopstate = () => {
  navigate();
};

navigate();
