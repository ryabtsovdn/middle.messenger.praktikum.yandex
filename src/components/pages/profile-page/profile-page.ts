import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './profile-page.tmpl';
import '../../atoms/link';
import '../../organisms/avatar';
import '../../organisms/profile-form';
import '../../organisms/password-form';
import '../../organisms/avatar-form';
import '../../templates/modal-template';
import './profile-page.css';

const tmpl = new Templator(template);

export class ProfilePage extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}
