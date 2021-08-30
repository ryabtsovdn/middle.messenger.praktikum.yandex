import {Templator} from '../../../utils/templator';
import template from './auth-template.tmpl';
import './auth-template.css';

const tmpl = new Templator(template);
Templator.addPartial('templates-auth', tmpl);

export const render = tmpl.render.bind(tmpl);
