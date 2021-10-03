import {ChatsAPI} from '../api/chats-api';
import store from '../utils/store';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async getChats(data: ChatsOptions) {
    try {
      const chats = await this.api.getAll(data);
      store.state.chats = chats;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new ChatsController();
