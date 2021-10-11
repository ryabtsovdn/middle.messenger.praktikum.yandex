import store from '../utils/store';
import {AuthAPI} from '../api/auth-api';
import {Router} from '../utils/router';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async getUser() {
    try {
      const user = await this.api.read();
      store.state.user = user;
    } catch (e) {
      store.state.user = null;
    }
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.getUser();
      new Router().go('/messenger');
    } catch (e) {
      console.log(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.getUser();
      new Router().go('/messenger');
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      store.state.user = null;
      store.state.chats = null;
      new Router().go('/login');
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
