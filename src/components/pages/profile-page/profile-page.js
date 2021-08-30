import {Templator} from '../../../utils/templator';
import template from './profile-page.tmpl';
import '../../atoms/link';
import '../../organisms/avatar';
import '../../organisms/profile-form';
import '../../organisms/password-form';
import '../../organisms/avatar-form';
import '../../templates/modal-template';
import './profile-page.css';

const tmpl = new Templator(template);

export const render = tmpl.render.bind(tmpl);
