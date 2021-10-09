import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import './button.css';

const tmpl = new Templator(`
  <button class="button {{className}}">
    <span>{{text}}</span>
  </button>
`);

export class Button extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('atoms-button', Button);
