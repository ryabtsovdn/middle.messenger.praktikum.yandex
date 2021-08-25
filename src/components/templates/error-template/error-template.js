import {Templator} from '../../../utils/templator';
import template from './error-template.tmpl';
import '../../atoms/link';
import './error-template.css';

const tmpl = new Templator(template);
Templator.addPartial('templates-error', tmpl);

export const render = tmpl.render.bind(tmpl);
