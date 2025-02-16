<script
  lang="ts"
  setup
>
import { useAuthStore } from '@/stores/useAuthStore';
import { mdiAccountCircle, mdiLogin, mdiLogout, mdiMagnify, mdiThemeLightDark, mdiViewDashboard } from '@mdi/js';
import { useDisplay, useTheme } from 'vuetify';

const { mdAndUp } = useDisplay();
const authStore = useAuthStore();
const theme = useTheme();

function toggleTheme() {
  authStore.setTheme(theme.global.current.value.dark ? 'light' : 'dark');
  theme.global.name.value = authStore.theme;
}
</script>

<template>
  <v-app-bar
    :color="!theme.current.value.dark ? 'primary' : null"
    :scroll-behavior="!mdAndUp ? 'hide' : null"
  >
    <v-app-bar-title>
      <v-form>
        <v-autocomplete
          :disabled="!authStore.isAuthenticated"
          :items="[]"
          :prepend-inner-icon="mdiMagnify"
          :width="mdAndUp ? '25%' : '100%'"
          auto-select-first
          class="mt-5"
          density="comfortable"
          menu-icon=""
          placeholder="Search"
          rounded
          variant="outlined"
        />
      </v-form>
    </v-app-bar-title>

    <template #append>
      <v-btn
        :active=false
        :icon="mdiViewDashboard"
        to="/"
      />
      <v-menu>
        <template #activator="{props}">
          <v-btn
            :icon="mdiAccountCircle"
            v-bind="props"
          />
        </template>

        <v-list>
          <v-list-item
            :prepend-icon="authStore.isAuthenticated ? mdiLogout : mdiLogin"
            to="/login"
          >
            <v-list-item-title>
              {{ `Log${authStore.isAuthenticated ? 'out' : 'in'}` }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            :prepend-icon="mdiThemeLightDark"
            @click="toggleTheme"
          >
            <v-list-item-title>Toggle theme</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>
