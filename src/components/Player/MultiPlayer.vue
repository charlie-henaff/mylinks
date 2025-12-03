<script
  setup
  lang="ts"
>
import VideoJsPlayer from '@/components/Player/VideoJsPlayer.vue';
import { httpsUrl, isValidUrl, isYouTubeUrl } from '@/utils.ts';

const props = defineProps<{
  url?: string,
}>();

const isVideoJsCompatible = isYouTubeUrl(props.url);
</script>

<template>
  <video-js-player
    v-if="isVideoJsCompatible"
    :url="url"
  />
  <v-btn
    v-else
    :href="httpsUrl(url)"
    :disabled="!isValidUrl(url)"
    target="_blank"
    class="ma-6"
    variant="plain"
    size="small"
    rounded="xl"
  >
    {{ url }}
  </v-btn>
</template>

<style scoped>

</style>
