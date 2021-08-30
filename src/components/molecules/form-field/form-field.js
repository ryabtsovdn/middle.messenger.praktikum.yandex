import {Templator} from '../../../utils/templator';
import template from './form-field.tmpl';
import '../../atoms/input';
import './form-field.css';

const tmpl = new Templator(template);
Templator.addPartial('molecules-form-field', tmpl);

export const render = tmpl.render.bind(tmpl);
