import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import '../../atoms/input';
import './search-form.css';

const tmpl = new Templator(`
  <form class="search-form">
    {{> atoms-input className="search-form__input" id="search" name="search" type="text" value=.value}}
    <label class="search-form__label" for="search">Поиск</label>
  </form>
`);

export class SearchForm extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-search-form', SearchForm);
