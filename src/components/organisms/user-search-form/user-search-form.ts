import {Templator} from '../../../utils/templator';
import {Block} from '../../../utils/block';
import userController from '../../../controllers/user-controller';
import './user-search-form.css';

const tmpl = new Templator(`
  <form class="user-search-form">
    <label for="user-search-form" class="user-search-form__label">Добавить пользователя:</label>
    <div class="user-search-form__results">
      {{> atoms-input name="user-search-form" className="user-search-form__input" onInput=.handleInput value=.value}}
      {{#if showEmptyMessage}}
        <div class="user-search-form__empty">Ничего не найдено</div>
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

      const hideAddedUsers = (user: UserData) =>
        !this.props.users.some((chatUser: UserData) => user.id === chatUser.id);

      this.abortController = null;
      this.setState({results: results.filter(hideAddedUsers), value});
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
