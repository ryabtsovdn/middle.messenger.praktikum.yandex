import {Templator} from '../../../../utils/templator';
import {Block} from '../../../../utils/block';
import '../../../atoms/button';

const addCls = 'chat-header__menu-button chat-header__add';
const rmCls = 'chat-header__menu-button chat-header__remove';

const tmpl = new Templator(`
  <div class="chat-header__menu">
    {{> atoms-button className="${addCls}" text="Добавить пользователя" onClick=.add}}
    {{> atoms-button className="${rmCls}" text="Удалить пользователя" onClick=.remove}}
  </div>
`);

export class ChatMenu extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}
