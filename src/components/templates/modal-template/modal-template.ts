import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './modal-template.tmpl';
import './modal-template.css';

const tmpl = new Templator(template);

export class ModalTemplate extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('templates-modal', ModalTemplate);
