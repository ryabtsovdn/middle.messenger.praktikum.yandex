import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import '../../atoms/input';
import './form-field.css';

const tmpl = new Templator(`
  <div class="form-field {{className}} {{#if disabled}}form-field_disabled{{/if}}">
    {{> atoms-input className="form-field__input" name=.name type=.type value=.value onInput=.onInput}}
    <label class="form-field__label" for={{name}}>
      {{label}}
    </label>
    <label class="validate__error" for={{name}}></label>
  </div>
`);

export class FormField extends Block {
  render(): string {
    return tmpl.compile(this.props);
  }
}

Templator.addPartial('molecules-form-field', FormField);
