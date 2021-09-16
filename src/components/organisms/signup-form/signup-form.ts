import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './signup-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './signup-form.css';

const tmpl = new Templator(template);

export class SignUpForm extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-signup-form', SignUpForm);
