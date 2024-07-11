import { defineStore } from 'pinia';

export const useTokenStore = defineStore({
  id: 'tokenStore',
  state: () => ({
    csrfToken: null as string | null,
  }),
  actions: {
    setCsrfToken(token: string | null): void {
      this.csrfToken = token;
    },
  },
  getters: {
    csrfTokenValue(): string | null {
      return this.csrfToken;
    },
  },
});

export default useTokenStore;
