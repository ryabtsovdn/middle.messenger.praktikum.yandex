import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import './file-field.css';

const tmpl = new Templator(`
  <label for="{{id}}" class="file-field {{className}}">
    <p class="file-field__filename"></p>
    <input id="{{id}}" class="file-field__input" type="file" name="{{name}}">
    <span class="file-field__text">Выбрать файл на компьютере</span>
  </label>
`);

export class FileField extends Block {
  initState(): void {
    this.state = {
      events: {
        change: (event: InputEvent) => {
          const el = event.target as HTMLInputElement;
          const file = el.files && el.files[0];
          const textElement = this.element?.querySelector(
            '.file-field__filename'
          ) as HTMLSpanElement;
          textElement.textContent = file?.name || '';
        },
      },
    };
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      ...this.state,
    });
  }
}

Templator.addPartial('molecules-file-field', FileField);
