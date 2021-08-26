import {Templator} from '../../../utils/templator';
import template from './avatar.tmpl';
import './avatar.css';

const tmpl = new Templator(template);
Templator.addPartial('organisms-avatar', tmpl);

export const render = tmpl.render.bind(tmpl);
