import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './error-page.tmpl';
import '../../atoms/link';
import './error-page.css';

const tmpl = new Templator(template);

export class ErrorPage extends Block {
  override render(): string {
    return tmpl.compile(this.props);
  }
}
