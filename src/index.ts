import {Block} from './utils/block';
import {LoginPage} from './components/pages/login-page';
import {ChatPage} from './components/pages/chat-page';
import {RegisterPage} from './components/pages/register-page';
import {ProfilePage} from './components/pages/profile-page';
import {ErrorPage} from './components/pages/error-page';

const root = document.getElementById('root');

const routes: Record<string, Block> = {
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
  if (root) {
    root.innerHTML = '';
    const content = page.element as HTMLElement;
    root.append(content);
  }
};

window.onpopstate = () => {
  navigate();
};

navigate();
