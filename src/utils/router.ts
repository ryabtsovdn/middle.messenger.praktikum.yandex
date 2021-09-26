import {Block} from './block';
import {Route} from './route';
import get from './get';

export class Router {
  static __instance: Router;

  private _currentRoute!: Nullable<Route>;
  private readonly _rootQuery!: string;
  history!: History;
  routes!: Route[];

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;
    this._currentRoute = null;

    this.history = window.history;
    this.routes = [];

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, props?: UnknownObject): Router {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
      ...props,
    });
    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = event => {
      const pathname = get(event, 'currentTarget.location.pathname');

      if (pathname) {
        this._onRoute(pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    this._currentRoute.render();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }
}
