import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import './input.css';

const tmpl = new Templator(`
  <input id="{{name}}" type="{{type}}" class="{{className}}" name="{{name}}" value="{{value}}" placeholder=" ">
`);

export class Input extends Block {
  constructor(props: AnyObject) {
    super({
      ...props,
      events: {
        input: props.onInput,
        change: props.onChange,
        blur: props.onBlur,
      },
    });
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('atoms-input', Input);
