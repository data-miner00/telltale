import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    username: 'Anon',
    password: '',
    avatarUrl: 'https://randomuser.me/api/portraits/men/24.jpg',
    web3User: false,
    openAiKey: '',
  }),
  getters: {},
  actions: {
    setUser() {},
    setUsername(username: string) {
      this.username = username;
    },
    setUserId(userId: string) {
      this.userId = userId;
    },
    setAvatarUrl(url: string) {
      this.avatarUrl = url;
    },
  },
});
