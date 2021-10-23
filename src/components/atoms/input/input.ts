import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import './input.css';

const tmpl = new Templator(`
  <input id="{{name}}" type="{{type}}" class="{{className}}" name="{{name}}" value="{{value}}" placeholder=" ">
`);

export class Input extends Block {
  init(props: AnyObject): AnyObject {
    return {
      events: {
        input: props.onInput || undefined,
      },
    };
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('atoms-input', Input);
