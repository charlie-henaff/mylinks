import { defineStore } from 'pinia';

export const useSnackBarStore = defineStore('snackBarStore', {
  state: () => ({
    message: null,
    color: null,
  }),
  actions: {
    displayMessage(message: string) {
      this.clear();
      this.message = message;
    },
    displayError(message: string) {
      this.displayMessage(message);
      this.color = 'error';
    },
    clear() {
      this.message = null;
      this.color = null;
    },
  },
});
