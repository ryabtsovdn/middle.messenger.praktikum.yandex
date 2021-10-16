import {EventBus, Listener} from './eventbus';

type StateObject = {__path: string} & AnyObject;

class Store extends EventBus {
  private _state: StateObject;
  state: StateObject;

  constructor() {
    super();

    const handler: ProxyHandler<StateObject> = {
      get: (target, prop: string, receiver) => {
        const value = target[prop];

        if (typeof value === 'undefined') {
          return;
        }

        if (typeof value === 'object' && value !== null && !value.__path) {
          value.__path = `${target.__path ? target.__path + '.' : ''}${prop}`;
          Object.defineProperty(value, '__path', {enumerable: false});
          target[prop] = new Proxy(value, handler);
        }

        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop, value) => {
        target[prop as string] = value;

        if (this.listeners[target.__path]) {
          this.emit(target.__path);
        }

        return true;
      },
    };

    this._state = {__path: ''};
    this.state = new Proxy(this._state, handler);

    (window as any).store = this;
    (window as any).state = this.state;
  }

  subscribe(path: string, cb: Listener): void;
  subscribe(path: any, cb: Listener): void {
    this.on(typeof path === 'string' ? path : (path && path.__path) || '', cb);
  }

  unsubscribe(path: string, cb: Listener): void;
  unsubscribe(path: any, cb: Listener): void {
    this.off(typeof path === 'string' ? path : path.__path, cb);
  }
}

export default new Store();
