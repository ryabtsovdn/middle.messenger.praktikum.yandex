import {Templator} from '../../../utils/templator';
import template from './profile-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './profile-form.css';

const tmpl = new Templator(template);
Templator.addPartial('organisms-profile-form', tmpl);

export const render = tmpl.render.bind(tmpl);
