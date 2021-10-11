import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import '../../atoms/link';
import './error-page.css';

const tmpl = new Templator(`
  <main class="error-page">
    <h1 class="error-page__code">{{code}}</h1>
    <h2 class="error-page__message">{{message}}</h2>
    {{> atoms-link href="/messenger" className="error-page__back" text="Назад к чатам"}}
  </main>
`);

export class ErrorPage extends Block {
  override render(): string {
    return tmpl.compile(this.props);
  }
}
