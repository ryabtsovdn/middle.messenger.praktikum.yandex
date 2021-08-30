import {Templator} from '../../../utils/templator';
import template from './chat-page.tmpl';
import '../../templates/chat-template';

const tmpl = new Templator(template);

export const render = tmpl.render.bind(tmpl);
