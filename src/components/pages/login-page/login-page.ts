import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import serializeForm from '../../../utils/serialize-form';
import template from './login-page.tmpl';
import '../../organisms/signin-form';
import '../../templates/auth-template';

const tmpl = new Templator(template);

export class LoginPage extends Block {
  render(): string {
    return tmpl.compile({
      form: {
        events: {
          submit: function (event: SubmitEvent) {
            event.preventDefault();
            console.log(serializeForm(event.target as HTMLFormElement));
            window.history.pushState(null, '', '/');
            dispatchEvent(new PopStateEvent('popstate'));
          },
        },
      },
    });
  }
}
