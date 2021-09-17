import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './messages-list.tmpl';
import '../../molecules/message';
import './messages-list.css';

const tmpl = new Templator(template);

export class MessagesList extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-messages-list', MessagesList);
