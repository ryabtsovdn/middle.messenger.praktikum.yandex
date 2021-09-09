import {Templator} from '../../../utils/templator';
import template from './chat-template.tmpl';
import './chat-template.css';

const tmpl = new Templator(template);
Templator.addPartial('templates-chat', tmpl);

export const render = tmpl.render.bind(tmpl);
