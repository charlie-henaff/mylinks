import { defineStore } from 'pinia';
import { getCurrentUser } from 'vuefire';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuthenticated: false,
    currentUser: undefined,
    theme: localStorage.getItem('theme') ?? undefined,
  }),
  actions: {
    async checkAuth(retry = 1){
      if (!this.isAuthenticated || !this.currentUser) {
        if (retry){
          await this.refreshCurrentUser();
          return await this.checkAuth(retry--);
        }
        return false;
      }
      return true;
    },
    async refreshCurrentUser() {
      const currentUser = await getCurrentUser();
      this.currentUser = currentUser;
      this.isAuthenticated = !!currentUser;
    },
    setTheme(theme) {
      localStorage.setItem('theme', theme);
      this.theme = theme;
    },
  },
});
