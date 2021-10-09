import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import store from '../../../utils/store';
import {Router} from '../../../utils/router';
import '../../organisms/signup-form';
import '../../templates/auth-template';

const tmpl = new Templator(`
  <main>
    {{> templates-auth className="register-page" &content="organisms-signup-form"}}
  </main>
`);

export class RegisterPage extends Block {
  componentDidMount(): void {
    if (store.state.user) {
      new Router().go('/messenger');
    }
  }

  render(): string {
    return tmpl.compile({});
  }
}
