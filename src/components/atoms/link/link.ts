import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './link.tmpl';
import './link.css';

const tmpl = new Templator(template);

export class Link extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('atoms-link', Link);
