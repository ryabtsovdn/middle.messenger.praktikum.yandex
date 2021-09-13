type Event = string;
type Listener = (...args: any[]) => void;

export class EventBus {
  listeners: Record<string, Listener[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: Event, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: Event, callback: Listener): void {
    if (!this.listeners[event]) {
      throw new Error(`There's no event: ${event}`);
    }
    this.listeners.event = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event: Event, ...args: any[]): void {
    if (!this.listeners[event]) {
      throw new Error(`There's no event: ${event}`);
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}
