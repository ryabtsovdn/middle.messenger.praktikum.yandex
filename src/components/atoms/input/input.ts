import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import './input.css';

const tmpl = new Templator(`
  <input id="{{name}}" type="{{type}}" class="{{className}}" name="{{name}}" value="{{value}}" placeholder=" ">
`);

export class Input extends Block {
  initState(props: AnyObject): void {
    if (props.onInput) {
      this.state = {
        events: {
          input: props.onInput,
        },
      };
    }
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('atoms-input', Input);
