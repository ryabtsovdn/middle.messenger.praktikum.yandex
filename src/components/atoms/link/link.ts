import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import {Router} from '../../../utils/router';
import './link.css';

const tmpl = new Templator(`
  <a href="{{href}}" class="link {{className}}">
    {{text}}
  </a>
`);

export class Link extends Block {
  initState(props: AnyObject): void {
    this.state = {
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
    };
  }

  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('atoms-link', Link);
