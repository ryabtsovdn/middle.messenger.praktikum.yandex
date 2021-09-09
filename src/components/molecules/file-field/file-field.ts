import {Templator} from '../../../utils/templator';
import template from './file-field.tmpl';
import './file-field.css';

const tmpl = new Templator(template);
Templator.addPartial('molecules-file-field', tmpl);

export const render = tmpl.render.bind(tmpl);
