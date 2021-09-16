import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './file-field.tmpl';
import './file-field.css';

const tmpl = new Templator(template);

export class FileField extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('molecules-file-field', FileField);
