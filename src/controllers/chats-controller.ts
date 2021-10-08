import {WS} from '../utils/ws';
import {ChatsAPI} from '../api/chats-api';
import store from '../utils/store';

type StoredChat = ChatData & {
  messages: MessageData[];
  ws: WS;
};

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async _storeChat(chat: ChatData) {
    const token = await new ChatsAPI().getToken(chat.id);

    const current = (store.state.chats[chat.id] = chat) as StoredChat;
    Object.assign(current, {
      messages: [],
      ws: new WS({
        userId: store.state.user.id,
        chatId: chat.id,
        token,
        handlers: {
          onMessage(data) {
            const parsedMessage = JSON.parse(data);

            if (Array.isArray(parsedMessage)) {
              current.messages.push(...parsedMessage.reverse());
            } else {
              current.messages.push(parsedMessage);
            }
          },
          onOpen() {
            current.ws.send({
              type: 'get old',
              content: '0',
            });
          },
        },
      }),
    });
  }

  async initChats() {
    try {
      const chats = await this.api.getAll({offset: 0, title: ''});
      store.state.chats = {};

      for (const chat of chats) {
        await this._storeChat(chat);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async createChat(title: string): Promise<void> {
    try {
      await this.api.create({title});
      const chats = await this.api.getAll({offset: 0, title});
      await this._storeChat(chats[0]);
    } catch (e) {
      console.log(e);
    }
  }

  async syncChatUsers(chatId: number): Promise<void> {
    try {
      const users = await this.api.getUsers(chatId);
      store.state.chats[chatId].users = users;
    } catch (e) {
      console.log(e);
    }
  }

  async removeUser(chatId: number, userId: number): Promise<void> {
    try {
      await this.api.removeUser({users: [userId], chatId});
      const chat = store.state.chats[chatId];
      chat.users = chat.users.filter((user: UserData) => user.id !== userId);
    } catch (e) {
      console.log(e);
    }
  }

  async addUser(chatId: number, userId: number): Promise<void> {
    try {
      await this.api.addUser({users: [userId], chatId});
      await this.syncChatUsers(chatId);
    } catch (e) {
      console.log(e);
    }
  }

  sendMessage(chatId: number, message: {type: string; content: any}) {
    store.state.chats[chatId].ws.send(message);
  }
}

export default new ChatsController();
