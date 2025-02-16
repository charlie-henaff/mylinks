<script
  lang="ts"
  setup
>
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSnackBarStore } from '@/stores/useSnackBarStore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const firebaseAuth = getAuth();
const route = useRoute();
const authStore = useAuthStore();
const snackBarStore = useSnackBarStore();

const email = ref('');
const password = ref('');

authStore.refreshCurrentUser();

watch(authStore, ({ isAuthenticated, currentUser }) => {
  email.value = isAuthenticated ? currentUser.email : '';
  password.value = isAuthenticated ? 'xxxxxxxxxxxx' : '';
}, { immediate: true });

async function createAccount() {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, email.value, password.value);
    await authStore.refreshCurrentUser();
    snackBarStore.displayMessage('Account successfully created');
    goBack();
  } catch ({ message }) {
    snackBarStore.displayError(message);
  }
}

async function login() {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email.value, password.value);
    await authStore.refreshCurrentUser();
    goBack();
  } catch ({ message }) {
    snackBarStore.displayError(message);
  }
}

async function logout() {
  try {
    await firebaseSignOut(firebaseAuth);
    await authStore.refreshCurrentUser();
    snackBarStore.displayMessage('You have successfully sign out');
  } catch ({ message }) {
    snackBarStore.displayError(message);
  }
}

function goBack() {
  router.push(route.query.redirect || '/');
}
</script>

<template>
  <v-container class="fill-height">
    <v-sheet class="pa-md-12 mb-16">
      <h1>Connection</h1>
      <p>This app requires an account to save and manage your own links</p>
      <v-form
        class="mt-4"
        @submit.prevent="login"
      >
        <v-text-field
          v-model="email"
          :disabled="authStore.isAuthenticated"
          autofocus
          label="Email"
          rounded
          type="email"
          variant="outlined"
        />
        <v-text-field
          v-model="password"
          :disabled="authStore.isAuthenticated"
          label="Password"
          rounded
          type="password"
          variant="outlined"
        />
        <div class="d-flex align-center justify-space-between">
          <p v-if="authStore.isAuthenticated">
            You are currently logged in
          </p>
          <v-btn
            v-else
            rounded
            text="Create account"
            variant="text"
            @click="createAccount"
          />
          <div v-if="authStore.isAuthenticated">
            <v-btn
              rounded
              text="Go back"
              variant="text"
              @click="goBack"
            />
            <v-btn
              class="me-2"
              color="primary"
              rounded
              text="Logout"
              @click="logout"
            />
          </div>
          <v-btn
            v-else
            color="primary"
            rounded
            text="Login"
            type="submit"
          />
        </div>
      </v-form>
    </v-sheet>
  </v-container>
</template>
