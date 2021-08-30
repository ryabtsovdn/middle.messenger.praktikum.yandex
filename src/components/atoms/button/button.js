import {Templator} from '../../../utils/templator';
import template from './button.tmpl';
import './button.css';

const tmpl = new Templator(template);
Templator.addPartial('atoms-button', tmpl);

export const render = tmpl.render.bind(tmpl);
