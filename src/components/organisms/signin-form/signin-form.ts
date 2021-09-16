import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './signin-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './signin-form.css';

const tmpl = new Templator(template);

export class SignInForm extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-signin-form', SignInForm);
