import {Templator} from '../../../utils/templator';
import template from './signup-form.tmpl';
import '../../molecules/form-field';
import '../../atoms/button';
import '../../atoms/link';
import './signup-form.css';

const tmpl = new Templator(template);
Templator.addPartial('organisms-signup-form', tmpl);

export const render = tmpl.render.bind(tmpl);
