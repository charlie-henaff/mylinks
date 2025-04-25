<script
  lang="ts"
  setup
>
import LinkCard from '@/components/Card/LinkCard.vue';
import AddLinkForm from '@/components/Form/AddLinkForm.vue';
import MasonryLayout from '@/components/Layout/MasonryLayout.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { useLinksStore } from '@/stores/useLinksStore.ts';
import { stringToColor } from '@/utils.ts';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

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
    <div class="py-4">
      <add-link-form />
    </div>
    <v-expand-transition>
      <div
        v-if="route.query.tag"
        class="d-flex justify-center align-center py-4"
      >
        <span class="me-2">Filters:</span>
        <v-chip
          :text="route.query.tag"
          :color="stringToColor(route.query.tag, authStore.theme)"
          closable
          @click:close="router.push('')"
        />
      </div>
    </v-expand-transition>
    <div class="py-4">
      <masonry-layout
        :items="linksStore.links"
        :getKey="(item) => item.id"
      >
        <template #default="{ item }">
          <link-card :link="item" />
        </template>
      </masonry-layout>
    </div>
  </v-container>
</template>
