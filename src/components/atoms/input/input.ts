import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './input.tmpl';
import './input.css';

const tmpl = new Templator(template);

export class Input extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('atoms-input', Input);
