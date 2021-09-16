import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './profile-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './profile-form.css';

const tmpl = new Templator(template);

export class ProfileForm extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-profile-form', ProfileForm);
