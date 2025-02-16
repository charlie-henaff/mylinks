<script
  lang="ts"
  setup
>
import AppBar from '@/components/AppBar.vue';
import AppSnackBar from '@/components/AppSnackBar.vue';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { RouterView } from 'vue-router';
import { useTheme } from 'vuetify';

const authStore = useAuthStore();
const theme = useTheme();

const windowPreferDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

if (!authStore.theme) {
  setTheme(windowPreferDarkTheme.matches);
}

windowPreferDarkTheme.addEventListener('change', (e) => {
  setTheme(e.matches);
});

function setTheme(dark) {
  authStore.setTheme(dark ? 'dark' : 'light');
  theme.global.name.value = authStore.theme;
}
</script>

<template>
  <v-app>
    <AppBar />
    <v-main>
      <RouterView />
    </v-main>
    <AppSnackBar />
  </v-app>
</template>

<style scoped>

</style>
