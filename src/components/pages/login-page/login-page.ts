import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './login-page.tmpl';
import '../../organisms/signin-form';
import '../../templates/auth-template';

const tmpl = new Templator(template);

export const render = tmpl.render.bind(tmpl);

export class LoginPage extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}
