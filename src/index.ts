import {LoginPage} from './components/pages/login-page';
import {ChatPage} from './components/pages/chat-page';
import {RegisterPage} from './components/pages/register-page';
import {ProfilePage} from './components/pages/profile-page';
import {ErrorPage} from './components/pages/error-page';

const root = document.getElementById('root');

export interface IBlock {
  getContent: () => HTMLElement;
}

const routes: Record<string, IBlock> = {
  '/': new ChatPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/profile': new ProfilePage({state: 'profile'}),
  '/profile/edit': new ProfilePage({state: 'edit'}),
  '/profile/password': new ProfilePage({state: 'password'}),
  '/profile/avatar': new ProfilePage({state: 'avatar'}),
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
