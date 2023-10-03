import { defineStore } from 'pinia';
import { User } from './shared.types';

export const useUserStore = defineStore('user', {
  state: (): User => ({
    id: 0,
    socketId: '',
    username: '',
    online: true,
    joinedAt: '',
    alias: '',
    avatarUrl: '',
    isEmailVerified: false,
    location: '',
    description: '',
    phoneNumber: '',
    ssoProvider: '',
    web3Address: '',
    web3Network: '',
    openAiKey: '',
    lastSeen: '',
  }),
  getters: {},
  actions: {
    setUser(user: User) {
      this.id = user.id;
      this.socketId = user.socketId;
      this.username = user.username;
      this.online = user.online;
      this.joinedAt = user.joinedAt;
      this.alias = user.alias;
      this.avatarUrl = user.avatarUrl;
      this.isEmailVerified = user.isEmailVerified;
      this.location = user.location;
      this.description = user.description;
      this.phoneNumber = user.phoneNumber;
      this.ssoProvider = user.ssoProvider;
      this.web3Address = user.web3Address;
      this.web3Network = user.web3Network;
      this.openAiKey = user.openAiKey;
      this.lastSeen = user.lastSeen;
    },
    setUsername(username: string) {
      this.username = username;
    },
    setUserId(id: number) {
      this.id = id;
    },
    setAvatarUrl(url: string) {
      this.avatarUrl = url;
    },
    setSocketId(socketId: string) {
      this.socketId = socketId;
    },
  },
});
