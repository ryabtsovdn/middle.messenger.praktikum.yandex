import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import './auth-template.css';

const tmpl = new Templator(`
  <div class="auth-page {{className}}">
    {{content}}
  </div>
`);

export class AuthTemplate extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('templates-auth', AuthTemplate);
