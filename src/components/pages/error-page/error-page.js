import {Templator} from '../../../utils/templator';
import template from './error-page.tmpl';
import '../../atoms/link';
import './error-page.css';

const tmpl = new Templator(template);

export const render = tmpl.render.bind(tmpl);
