<script
  setup
  lang="ts"
>
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { useLinksStore } from '@/stores/useLinksStore.ts';
import { httpsUrl, isValidUrl, stringToColor } from '@/utils.ts';
import { mdiLink, mdiPencil, mdiTrashCan } from '@mdi/js';

defineProps<{
  link: {
    id: sting,
    title?: string,
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
    class="pt-2 text-center"
  >
    <v-card-title class="text-capitalize">{{ link.title }}</v-card-title>
    <v-card-subtitle>{{ link.link }}</v-card-subtitle>
    <v-card-text>
      <div class="d-flex justify-center flex-wrap ga-2">
        <v-chip
          v-for="tag in link.tags"
          :to="`?tag=${tag}`"
          :key="tag"
          :text="tag"
          :color="stringToColor(tag, authStore.theme)"
          density="compact"
        />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="error"
        :icon="mdiTrashCan"
        @click="linksStore.deleteLink(link.id)"
      />
      <v-btn
        color="primary"
        :icon="mdiPencil"
        @click="editLink(link.id)"
      />
      <v-spacer />
      <v-btn
        :href="httpsUrl(link.link)"
        :icon="mdiLink"
        :disabled="!isValidUrl(link.link)"
        target="_blank"
        color="primary"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
