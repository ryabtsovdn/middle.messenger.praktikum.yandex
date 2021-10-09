import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import store from '../../../utils/store';
import {Router} from '../../../utils/router';
import '../../organisms/signin-form';
import '../../templates/auth-template';

const tmpl = new Templator(`
  <main>
    {{> templates-auth className="login-page" &content="organisms-signin-form"}}
  </main>
`);

export class LoginPage extends Block {
  componentDidMount(): void {
    if (store.state.user) {
      new Router().go('/messenger');
    }
  }

  render(): string {
    return tmpl.compile({});
  }
}
