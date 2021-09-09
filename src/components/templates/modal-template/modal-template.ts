import {Templator} from '../../../utils/templator';
import template from './modal-template.tmpl';
import './modal-template.css';

const tmpl = new Templator(template);
Templator.addPartial('templates-modal', tmpl);

export const render = tmpl.render.bind(tmpl);
