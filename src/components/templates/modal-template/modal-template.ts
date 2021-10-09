import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import './modal-template.css';

const tmpl = new Templator(`
  <div class="modal {{className}}">
    <div class="modal__overlay"></div>
    <div class="modal__content">
      {{content}}
    </div>
  </div>
`);

export class ModalTemplate extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('templates-modal', ModalTemplate);
