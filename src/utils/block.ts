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
  protected readonly props: UnknownObject;
  protected readonly _eventBus: EventBus;

  constructor(props: UnknownObject = {}) {
    this._eventBus = new EventBus();

    this.props = this._makePropsProxy(props);
    this._id = `id-${nanoid()}`;

    this._registerEvents();

    this._eventBus.emit(Block.EVENTS.INIT);
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

  _componentDidMount(props: UnknownObject): void {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    this.componentDidMount(props);
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
    this.element!.style.display = 'block';
  }

  hide(): void {
    this.element!.style.display = 'none';
  }
}
