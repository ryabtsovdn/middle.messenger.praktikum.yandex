import {Templator} from '../../../utils/templator';
import template from './link.tmpl';
import './link.css';

const tmpl = new Templator(template);
Templator.addPartial('atoms-link', tmpl);

export const render = tmpl.render.bind(tmpl);
