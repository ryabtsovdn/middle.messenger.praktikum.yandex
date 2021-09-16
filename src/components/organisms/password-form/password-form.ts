import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './password-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './password-form.css';

const tmpl = new Templator(template);

export class PasswordForm extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-password-form', PasswordForm);
