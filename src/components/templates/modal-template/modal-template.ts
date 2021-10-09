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
  initState(props: AnyObject): void {
    this.state = {
      events: {
        click: (event: MouseEvent) => {
          event.stopPropagation();

          const el = event.target as HTMLElement;
          if (!el.matches('.modal__overlay')) {
            return;
          }

          if (props.onClose) {
            props.onClose();
          }
        },
      },
    };
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('templates-modal', ModalTemplate);
