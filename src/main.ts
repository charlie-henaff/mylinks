import App from '@/App.vue';
import defaults from '@/defaults.ts';
import { firebaseApp } from '@/firebase.ts';
import router from '@/router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { VueFire, VueFireAuth } from 'vuefire';
import { createVuetify } from 'vuetify';

import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import colors from 'vuetify/util/colors';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: localStorage.getItem('theme') ?? 'light',
    themes: {
      light: {
        colors: {
          background: colors.grey.lighten4
        },
      },
    },
  },
  defaults,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
}));
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
});

app.mount('#app');
