import {ChatPage} from './components/pages/chat-page';
import {LoginPage} from './components/pages/login-page';
import {RegisterPage} from './components/pages/register-page';
import {ProfilePage} from './components/pages/profile-page';
import {ErrorPage} from './components/pages/error-page';
import {Router} from './utils/router';

const router = new Router('#root');

router
  .use('/', ChatPage)
  .use('/login', LoginPage)
  .use('/register', RegisterPage)
  .use('/profile', ProfilePage, {state: 'profile'})
  .use('/profile/edit', ProfilePage, {state: 'edit'})
  .use('/profile/password', ProfilePage, {state: 'password'})
  .use('/profile/avatar', ProfilePage, {state: 'avatar'})
  .use('/500', ErrorPage, {code: 500, message: 'Мы уже фиксим'})
  .use('/404', ErrorPage, {code: 404, message: 'Не туда попали'})
  .start();
