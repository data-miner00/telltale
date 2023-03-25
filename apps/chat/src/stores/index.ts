import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    username: 'Anon',
    password: '',
    profilePic: '',
    web3User: false,
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
  },
});
