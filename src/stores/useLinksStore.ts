import { db } from '@/firebase.ts';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { useSnackBarStore } from '@/stores/useSnackBarStore.ts';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { defineStore } from 'pinia';

export const useLinksStore = defineStore('linksStore', {
  state: () => ({
    loading: false,
    links: [],
    unsubscribeLinks: null as (() => void) | null,
  }),
  actions: {
    async subscribeToLinks() {
      const authStore = useAuthStore();

      if (!await authStore.checkAuth()) {
        return;
      }

      const q = query(
        collection(db, 'links'),
        where('userId', '==', authStore.currentUser.uid),
        orderBy('updatedAt', 'desc'),
      );

      this.unsubscribeLinks = onSnapshot(q, (querySnapshot) => {
        this.links = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });
    },
    unsubscribeFromLinks() {
      if (this.unsubscribeLinks) {
        this.unsubscribeLinks();
        this.unsubscribeLinks = null;
      }
    },
    async addLink(linkData: { title: string, link: string, tags: string[] }) {
      const authStore = useAuthStore();
      const snackbarStore = useSnackBarStore();

      this.loading = true;

      try {
        if (!await authStore.checkAuth()) {
          throw new Error('You are not logged in');
        }

        await addDoc(collection(db, 'links'), {
          ...linkData,
          userId: authStore.currentUser.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch ({ message }) {
        snackbarStore.displayError(message);
      } finally {
        this.loading = false;
        snackbarStore.displayMessage('Link added');
      }
    },
    async updateLink(linkId: string, updatedData: {
      title?: string,
      link?: string,
      tags?: string[]
    }) {
      const authStore = useAuthStore();
      const snackbarStore = useSnackBarStore();

      this.loading = true;

      try {
        if (!await authStore.checkAuth()) {
          throw new Error('You are not logged in');
        }

        await updateDoc(doc(db, 'links', linkId), {
          ...updatedData,
          updatedAt: serverTimestamp(),
        });
      } catch ({ message }) {
        snackbarStore.displayError(message);
      } finally {
        this.loading = false;
        snackbarStore.displayMessage('Link updated');
      }
    },
    async deleteLink(linkId: string) {
      const authStore = useAuthStore();
      const snackbarStore = useSnackBarStore();

      this.loading = true;

      try {
        if (!await authStore.checkAuth()) {
          throw new Error('You are not logged in');
        }

        await deleteDoc(doc(db, 'links', linkId));
      } catch ({ message }) {
        snackbarStore.displayError(message);
      } finally {
        this.loading = false;
        snackbarStore.displayMessage('Link deleted');
      }
    },
  },
});
