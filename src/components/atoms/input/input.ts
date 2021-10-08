import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './input.tmpl';
import './input.css';

const tmpl = new Templator(template);

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
