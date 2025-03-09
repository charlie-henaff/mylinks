<script
  lang="ts"
  setup
>
import AddLinkForm from '@/components/AddLinkForm.vue';
import LinkCard from '@/components/LinkCard.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { useLinksStore } from '@/stores/useLinksStore.ts';
import { stringToColor } from '@/utils.ts';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay();

const authStore = useAuthStore();
const linksStore = useLinksStore();
const route = useRoute();

onMounted(() => {
  linksStore.subscribeToLinks(route.query.tag);
});

watch(
  () => route.query.tag,
  (tag) => linksStore.subscribeToLinks(tag),
);

onBeforeUnmount(() => {
  linksStore.unsubscribeFromLinks();
});
</script>

<template>
  <v-container>
    <v-sheet
      v-if="mdAndUp"
      max-width="1500"
    >
      <div class="px-8">
        <add-link-form />
      </div>
    </v-sheet>
    <v-expansion-panels v-else>
      <v-expansion-panel>
        <v-expansion-panel-title>
          Add
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <add-link-form />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="mt-4 d-flex justify-center">
      <v-chip
        v-if="route.query.tag"
        :text="route.query.tag"
        :color="stringToColor(route.query.tag, authStore.theme)"
        closable
        @click:close="router.push('')"
      />
    </div>
    <v-row class="mt-1">
      <v-col
        v-for="link in linksStore.links"
        :key="link.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <link-card :link="link" />
      </v-col>
    </v-row>
  </v-container>
</template>
