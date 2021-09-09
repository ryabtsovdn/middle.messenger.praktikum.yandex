import {Templator} from '../../../utils/templator';
import template from './register-page.tmpl';
import '../../organisms/signup-form';
import '../../templates/auth-template';

const tmpl = new Templator(template);

export const render = tmpl.render.bind(tmpl);
