import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './register-page.tmpl';
import '../../organisms/signup-form';
import '../../templates/auth-template';

const tmpl = new Templator(template);

export class RegisterPage extends Block {
  render(): string {
    return tmpl.compile({
      form: {
        onSubmit: () => {
          window.history.pushState(null, '', '/messenger');
          dispatchEvent(new PopStateEvent('popstate'));
        },
      },
    });
  }
}
