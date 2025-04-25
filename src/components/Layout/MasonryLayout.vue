<script
  setup
  lang="ts"
>
defineProps<{
  items: unknown[],
  getKey?: (item: unknown, index: number) => string | number
}>();
</script>

<template>
  <div class="masonry">
    <div
      class="masonry-item"
      v-for="(item, index) in items"
      :key="getKey ? getKey(item, index) : index"
    >
      <slot
        :item="item"
        :index="index"
      />
    </div>
  </div>
</template>

<style scoped>
    .masonry {
        column-count: auto;
        column-width: 300px;
        column-gap: 16px;
        width: 100%;
        max-width: 100%;
    }

    .masonry-item {
        break-inside: avoid;
        margin-bottom: 16px;
        width: 100%;
    }
</style>
