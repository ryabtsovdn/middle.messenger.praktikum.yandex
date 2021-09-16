import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './avatar.tmpl';
import './avatar.css';

const tmpl = new Templator(template);

export class Avatar extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-avatar', Avatar);
