import {Templator} from '../../../utils/templator';
import template from './avatar-form.tmpl';
import '../../molecules/file-field';
import '../../atoms/button';
import './avatar-form.css';

const tmpl = new Templator(template);
Templator.addPartial('organisms-avatar-form', tmpl);

export const render = tmpl.render.bind(tmpl);
