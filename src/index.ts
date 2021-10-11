import {ChatPage} from './components/pages/chat-page';
import {LoginPage} from './components/pages/login-page';
import {RegisterPage} from './components/pages/register-page';
import {ProfilePage} from './components/pages/profile-page';
import {ErrorPage} from './components/pages/error-page';
import {Router} from './utils/router';
import authController from './controllers/auth-controller';
import chatsController from './controllers/chats-controller';

const router = new Router();

router
  .use('/', LoginPage)
  .use('/login', LoginPage)
  .use('/sign-up', RegisterPage)
  .use('/messenger', ChatPage)
  .use('/settings', ProfilePage, {state: 'profile'})
  .use('/settings/edit', ProfilePage, {state: 'edit'})
  .use('/settings/password', ProfilePage, {state: 'password'})
  .use('/settings/avatar', ProfilePage, {state: 'avatar'})
  .use('/500', ErrorPage, {code: 500, message: 'Мы уже фиксим'})
  .use('/404', ErrorPage, {code: 404, message: 'Не туда попали'});

(async () => {
  try {
    await authController.getUser();
    await chatsController.initChats();

    router.start();
  } catch (e) {
    console.log(e);
  }
})();
