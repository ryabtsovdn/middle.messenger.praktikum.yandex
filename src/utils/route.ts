import {Block} from './block';

export class Route {
  static render(query: string, block: Block): void {
    const root = document.querySelector(query);
    if (!root) {
      throw new Error(`No elements matching the query: ${query}`);
    }

    root.append(block.element as HTMLElement);
  }

  _pathname: string;
  _view: typeof Block;
  _props: AnyObject;
  _block: Block | null;

  constructor(pathname: string, view: typeof Block, props: AnyObject) {
    this._pathname = pathname;
    this._view = view;
    this._props = props;

    this._block = null;
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return this._pathname === pathname;
  }

  render(): void {
    if (!this._block) {
      const {rootQuery, ...props} = this._props;
      this._block = new this._view(props);
      Route.render(rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
