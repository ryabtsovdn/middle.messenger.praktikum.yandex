import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './contact.tmpl';
import './contact.css';

const tmpl = new Templator(template);

export class Contact extends Block {
  constructor(props: AnyObject) {
    super({
      ...props,
      events: {
        click(): void {
          props.onClick(props.index);
        },
      },
    });
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('molecules-contact', Contact);
