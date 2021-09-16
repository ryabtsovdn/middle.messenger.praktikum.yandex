import {nanoid} from 'nanoid';
import {EventBus} from './eventbus';

export class Block {
  static components: Record<string, Block> = {};
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  _id?: string;
  protected _root: Nullable<HTMLTemplateElement> = null;
  protected _element: Nullable<HTMLElement> = null;
  protected readonly props: UnknownObject;
  eventBus: EventBus;

  constructor(props: UnknownObject = {}) {
    const eventBus = new EventBus();
    Object.defineProperty(this, 'eventBus', {
      get() {
        return eventBus;
      },
    });

    this.props = this._makePropsProxy(props);

    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(): void {
    this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _init(): void {
    this._root = document.createElement('template');
    this.eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);
  }

  _componentDidMount(props: UnknownObject): void {
    this.componentDidMount(props);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(props: UnknownObject): void {
    // Could be defined by user
  }

  _componentDidUpdate(oldProps: UnknownObject, newProps: UnknownObject): void {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);
    if (shouldUpdate) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(
    oldProps: UnknownObject,
    newProps: UnknownObject
  ): boolean {
    // Could be defined by user
    return true;
  }

  setProps(nextProps: UnknownObject): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement {
    return this._element;
  }

  get id(): UUID {
    return this._id;
  }

  _render(): void {
    const block = this.render();
    this._removeEvents();
    this._root.innerHTML = block;
    this._element = <HTMLElement>this._root.content.firstElementChild;
    this._id = nanoid();
    this._replaceStubs();
    this._addEvents();
  }

  _replaceStubs(): void {
    const stubs = this._element.querySelectorAll('[data-id]');
    Array.from(stubs).forEach(stub => {
      if (stub instanceof HTMLElement) {
        const component = Block.components[stub.dataset.id];
        stub.replaceWith(component._element || null);
      }
    });
  }

  _removeEvents(): void {
    if (!this.element) return;

    const {events = {}} = this.props;

    for (const [event, listener] of Object.entries(events)) {
      this._element.removeEventListener(event, listener);
    }
  }

  _addEvents(): void {
    const {events = {}} = this.props;

    for (const [event, listener] of Object.entries(events)) {
      this._element.addEventListener(event, listener);
    }
  }

  protected render(): string {
    // Should be defined by user
    return '<div></div>';
  }

  getContent(): HTMLElement {
    return this.element;
  }

  _makePropsProxy(props: UnknownObject): UnknownObject {
    const handler = {
      get: (target: UnknownObject, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: UnknownObject, prop: string, value: any) => {
        if (target[prop] === value) {
          return true;
        }
        const oldProps = {...target};
        target[prop] = value;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Permission denied');
      },
    };

    props = new Proxy(props, handler);

    return props;
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
