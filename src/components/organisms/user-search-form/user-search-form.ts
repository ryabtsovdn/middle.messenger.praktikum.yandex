import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import userController from '../../../controllers/user-controller';
import '../../molecules/form-field';
import './user-search-form.css';

const tmpl = new Templator(`
  <form class="user-search-form">
    <h2 class="user-search-form__title">{{title}}</h2>
    <div class="user-search-form__results">
      {{> molecules-form-field name="user-search-form" onInput=.handleInput value=.value label="Логин"}}
      {{#if showEmptyMessage}}
        <div class="user-search-form__empty">Пользователи не найдены</div>
      {{/if}}
      <ul class="user-search-form__list">
        {{#each results}}
          <li class="user-search-form__list-item" data-user-id={{#this.id}}>
            {{#this.login}}
          </li>
        {{/each}}
      </ul>
    </div>
  </form>
`);

export class UserSearchForm extends Block {
  abortController: Nullable<AbortController> = null;

  initState(props: AnyObject): void {
    this.state = {
      results: [],
      value: '',
      handleInput: this.handleInput.bind(this),
      events: {
        click: (event: MouseEvent) => {
          const el = event.target as HTMLElement;
          if (el.dataset.userId) {
            props.onSelect(Number(el.dataset.userId));
          }
        },
      },
    };
  }

  componentDidUpdate(_old: AnyObject, {value}: AnyObject): boolean {
    setTimeout(() => {
      const el = this.element?.querySelector('input');
      if (el && value) {
        el.focus();
        el.selectionStart = el.selectionEnd = value.length;
      }
    }, 0);
    return true;
  }

  async handleInput(event: InputEvent): Promise<void> {
    const value = (event.target as HTMLInputElement).value;

    if (this.abortController) {
      this.abortController.abort();
    }

    if (!value) {
      return void this.setState({results: [], value});
    }

    this.abortController = new AbortController();

    try {
      const results = await userController.search(
        value,
        this.abortController.signal
      );

      this.abortController = null;
      this.setState({results: results.filter(this.props.filterUsers), value});
    } catch (e) {
      console.log(e);
    }
  }

  render(): string {
    return tmpl.compile({
      ...this.props,
      ...this.state,
      showEmptyMessage: this.state.value && !this.state.results.length,
    });
  }
}

Templator.addPartial('organisms-user-search-form', UserSearchForm);
