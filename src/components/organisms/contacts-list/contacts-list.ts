import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './contacts-list.tmpl';
import '../../molecules/contact';
import './contacts-list.css';

const tmpl = new Templator(template);

export class ContactsList extends Block {
  constructor(props: AnyObject) {
    super({
      ...props,
      contacts: props.contacts.map((contact: any) => ({
        ...contact,
        lastMessage: contact.messages[contact.messages.length - 1],
      })),
    });
  }
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-contacts-list', ContactsList);
