import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './button.tmpl';
import './button.css';

const tmpl = new Templator(template);

export class Button extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('atoms-button', Button);
