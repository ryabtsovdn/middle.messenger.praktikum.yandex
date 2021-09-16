import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './avatar-form.tmpl';
import '../../molecules/file-field';
import '../../atoms/button';
import './avatar-form.css';

const tmpl = new Templator(template);

export class AvatarForm extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-avatar-form', AvatarForm);
