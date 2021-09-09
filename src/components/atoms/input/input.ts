import {Templator} from '../../../utils/templator';
import template from './input.tmpl';
import './input.css';

const tmpl = new Templator(template);
Templator.addPartial('atoms-input', tmpl);

export const render = tmpl.render.bind(tmpl);