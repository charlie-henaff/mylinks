<script
  setup
  lang="ts"
>
import { httpsUrl, isValidUrl, isYouTubeUrl } from '@/utils.ts';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-youtube/dist/Youtube.min.js';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  url?: string,
}>();

const isVideoJsCompatible = isYouTubeUrl(props.url);
const videoRef = ref<HTMLVideoElement | null>(null);
let player: videojs.Player | null = null;

onMounted(() => {
  if (!videoRef.value || !isVideoJsCompatible) return;

  const isYouTube = isYouTubeUrl(props.url);

  player = videojs(videoRef.value, {
    ...(isYouTube && {
      techOrder: ['youtube'],
      sources: [{ type: 'video/youtube', src: props.url }],
      youtube: {
        ytControls: 0,
        iv_load_policy: 3,
        rel: 0,
        modestbranding: 1,
      },
    }),
    controls: false,
    muted: true,
    fluid: true,
    preload: 'metadata',
    playsinline: true,
  });

  player.ready(() => {
    const loopDuration = 5;
    let loopStart = 0;
    let hasLooped = false;

    player.on('loadedmetadata', () => {
      const duration = player?.duration() || 0;
      loopStart = (duration - loopDuration) / 2;
      player.currentTime(loopStart);
      player.play();
    });

    player.on('timeupdate', () => {
      if (!player) return;
      const current = player.currentTime();

      if (!hasLooped && current > loopStart + 1) {
        hasLooped = true;
      }

      if (hasLooped && current >= loopStart + loopDuration) {
        player.currentTime(loopStart);
      }
    });
  });
});

onBeforeUnmount(() => {
  if (player) {
    player.dispose();
    player = null;
  }
});
</script>

<template>
  <div v-if="isVideoJsCompatible">
    <video
      ref="videoRef"
      class="video-js vjs-default-skin"
      playsinline
    >
    </video>
  </div>
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
