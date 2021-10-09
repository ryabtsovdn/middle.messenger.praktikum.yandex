import {WS_URL} from '../constants';

interface Handlers {
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onError?: () => void;
  onClose?: () => void;
}

interface SocketOptions {
  userId: number;
  chatId: number;
  token: string;
  handlers?: Handlers;
}

export class WS {
  static BASE_URL = WS_URL;
  static PING_TIMEOUT = 10000;

  private _socket: WebSocket;
  private _closed = false;
  handlers?: Handlers;

  constructor({userId, chatId, token, handlers}: SocketOptions) {
    this._socket = new WebSocket(`${WS.BASE_URL}/${userId}/${chatId}/${token}`);
    this.handlers = handlers;

    this.send = this.send.bind(this);
    this._ping = this._ping.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._onError = this._onError.bind(this);

    this._init();
  }

  send(message: {type: string; content?: any}): void {
    this._socket.send(JSON.stringify(message));
  }

  close(): void {
    this._socket.close();
    this._closed = false;
  }

  _init(): void {
    if (!this._socket) {
      return;
    }

    this._socket.addEventListener('open', this._onOpen);
    this._socket.addEventListener('close', this._onClose);
    this._socket.addEventListener('message', this._onMessage);
    this._socket.addEventListener('error', this._onError);
  }

  _ping(): void {
    this.send({type: 'ping'});
  }

  _onOpen(): void {
    console.log('Connected');

    this._ping();

    if (this.handlers?.onOpen) {
      this.handlers.onOpen();
    }
  }

  _onClose(event: CloseEvent): void {
    if (event.wasClean) {
      console.log('Closed correctly');
    } else {
      console.log('Broken connection');
    }

    if (this.handlers?.onClose) {
      this.handlers.onClose();
    }

    console.log(`Code: ${event.code} | Reason: ${event.reason}`);
  }

  _onMessage(event: MessageEvent): void {
    if (event.data === '{"type":"pong"}') {
      if (this._closed) {
        return;
      }

      return void setTimeout(() => this._ping(), WS.PING_TIMEOUT);
    }

    if (this.handlers?.onMessage) {
      this.handlers.onMessage(event.data);
    }
  }

  _onError(): void {
    if (this.handlers?.onError) {
      this.handlers.onError();
    }
  }
}
