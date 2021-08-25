import {Templator} from '../../../utils/templator';
import template from './signin-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './signin-form.css';

const tmpl = new Templator(template);
Templator.addPartial('organisms-signin-form', tmpl);

export const render = tmpl.render.bind(tmpl);
