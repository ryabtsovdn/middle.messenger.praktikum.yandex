import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './form-field.tmpl';
import '../../atoms/input';
import './form-field.css';

const tmpl = new Templator(template);

export class FormField extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('molecules-form-field', FormField);
