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

  protected _id: UUID;
  protected _element: Nullable<HTMLElement> = null;
  protected state: AnyObject = {};
  protected readonly props: AnyObject;
  protected readonly _eventBus: EventBus;

  constructor(props: AnyObject = {}) {
    this._eventBus = new EventBus();

    this.initState(props);

    this._id = `id-${nanoid()}`;
    this.props = this._makeProxy(props);
    this.state = this._makeProxy(this.state);

    this._registerEvents();

    this._eventBus.emit(Block.EVENTS.INIT);
  }

  // @ts-ignore
  protected initState(props: AnyObject): void {
    this.state = {};
  }

  get eventBus(): EventBus {
    return this._eventBus;
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
    this.eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);
  }

  _componentDidMount(props: AnyObject): void {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    this.componentDidMount(props);
  }

  // @ts-ignore
  componentDidMount(props: AnyObject): void {
    // Could be defined by user
  }

  _componentDidUpdate(oldProps: AnyObject, newProps: AnyObject): void {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);
    if (shouldUpdate) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(
    // @ts-ignore
    oldProps: AnyObject,
    // @ts-ignore
    newProps: AnyObject
  ): boolean {
    // Could be defined by user
    return true;
  }

  setProps(nextProps: AnyObject): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  setState(nextState: AnyObject): void {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  }

  get element(): Nullable<HTMLElement> {
    return this._element as HTMLElement;
  }

  get id(): UUID {
    return this._id;
  }

  _render(): void {
    this._removeEvents();

    const block = this.render();

    const fragment = document.createElement('template');
    fragment.innerHTML = block;

    this._replaceElements(fragment.content.firstElementChild as HTMLElement);
    this._addEvents();
  }

  _replaceElements(newElement: HTMLElement): void {
    if (this.element) {
      this.element.replaceWith(newElement);
    }

    this._element = newElement;

    const stubs = this.element!.querySelectorAll('[data-id]');
    Array.from(stubs).forEach(stub => {
      if (stub instanceof HTMLElement) {
        const blockId = stub.dataset.id as string;
        const component = Block.components[blockId];
        stub.replaceWith(component.element || '');
      }
    });
  }

  _removeEvents(): void {
    if (!this.element) return;

    const {events = {}} = this.props;

    for (const [event, listener] of Object.entries(
      events as Record<string, EventListener>
    )) {
      this.element.removeEventListener(event, listener);
    }
  }

  _addEvents(): void {
    if (!this.element) {
      throw new Error('No element');
    }

    const {events = {}} = this.props;

    for (const [event, listener] of Object.entries(
      events as Record<string, EventListener>
    )) {
      this.element.addEventListener(event, listener);
    }
  }

  protected render(): string {
    // Should be defined by user
    return '<div></div>';
  }

  _makeProxy(props: AnyObject): AnyObject {
    const handler = {
      get: (target: AnyObject, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: AnyObject, prop: string, value: any) => {
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
    this.element!.style.display = 'block';
  }

  hide(): void {
    this.element!.style.display = 'none';
  }
}
