import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import template from './search-form.tmpl';
import '../../atoms/input';
import './search-form.css';

const tmpl = new Templator(template);

export class SearchForm extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('organisms-search-form', SearchForm);
