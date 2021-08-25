import {Templator} from '../../../utils/templator';
import template from './500-page.tmpl';
import '../../templates/error-template';

const tmpl = new Templator(template);

export const render = tmpl.render.bind(tmpl);
