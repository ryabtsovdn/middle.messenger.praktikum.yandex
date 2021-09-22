import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './auth-template.tmpl';
import './auth-template.css';

const tmpl = new Templator(template);

export class AuthTemplate extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('templates-auth', AuthTemplate);
