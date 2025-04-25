<script
  setup
  lang="ts"
>
import MultiPlayer from '@/components/Player/MultiPlayer.vue';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { useLinksStore } from '@/stores/useLinksStore.ts';
import { httpsUrl, isValidUrl, stringToColor } from '@/utils.ts';
import { mdiLink, mdiPencil, mdiTrashCan } from '@mdi/js';

defineProps<{
  link: {
    id: sting,
    link?: string,
    tags?: string[],
  },
}>();

const authStore = useAuthStore();
const linksStore = useLinksStore();
</script>

<template>
  <v-card
    rounded="xl"
    class="text-center"
  >
    <multi-player :url="link.url" />
    <v-card-actions>
      <div class="tags-wrapper">
        <v-chip
          v-for="tag in link.tags"
          :to="`?tag=${tag}`"
          :key="tag"
          :text="tag"
          :color="stringToColor(tag, authStore.theme)"
          size="small"
        />
      </div>
      <v-spacer />
      <v-btn
        :icon="mdiTrashCan"
        color="error"
        size="small"
        @click="linksStore.deleteLink(link.id)"
      />
      <v-btn
        :icon="mdiPencil"
        color="primary"
        size="small"
        @click="editLink(link.id)"
      />
      <v-btn
        :href="httpsUrl(link.url)"
        :icon="mdiLink"
        :disabled="!isValidUrl(link.url)"
        target="_blank"
        color="primary"
        size="small"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
    .tags-wrapper {
        display: flex;
        gap: 2px;
        max-width: 100%;
        overflow-x: auto;
        padding-right: 4px;
        -ms-overflow-style: none; /* IE/Edge */
        scrollbar-width: none; /* Firefox */
    }

    .tags-wrapper::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
    }

    .tags-wrapper .v-chip {
        flex: 0 0 auto; /* Ne pas rétrécir, pas de grow */
        max-width: 100%; /* au cas où le texte est long */
    }
</style>
