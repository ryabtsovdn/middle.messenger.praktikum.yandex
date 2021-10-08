import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './link.tmpl';
import {Router} from '../../../utils/router';
import './link.css';

const tmpl = new Templator(template);

export class Link extends Block {
  constructor(props: AnyObject = {}) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();

          if (props.onClick) {
            props.onClick(event);
          }

          const href = this.element?.getAttribute('href');
          if (href) {
            new Router().go(href);
          }
        },
      },
    });
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('atoms-link', Link);
