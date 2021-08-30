import {Templator} from '../../../utils/templator';
import template from './password-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './password-form.css';

const tmpl = new Templator(template);
Templator.addPartial('organisms-password-form', tmpl);

export const render = tmpl.render.bind(tmpl);
