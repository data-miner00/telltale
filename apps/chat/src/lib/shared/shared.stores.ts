import { defineStore } from 'pinia';
import { MOCK_AVATAR_URL_MALE } from '@/lib/shared/shared.constants';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    username: localStorage.username ?? 'Anon',
    password: '',
    avatarUrl: MOCK_AVATAR_URL_MALE,
    web3User: false,
    openAiKey: '',
  }),
  getters: {},
  actions: {
    setUser() {},
    setUsername(username: string) {
      localStorage.username = username;
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
