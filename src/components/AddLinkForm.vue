<script
  lang="ts"
  setup
>
import { useLinksStore } from '@/stores/useLinksStore.ts';
import { mdiPlus } from '@mdi/js';
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

const { md, lg } = useDisplay();
const linksStore = useLinksStore();

const form = ref();
const formData = ref({
  title: '',
  link: '',
  tags: [] as string[],
});

const tagsSearch = ref('');
const tagsItems = ref<string[]>([]);

function handleTagsSearch(input: string) {
  if (input.includes(' ')) {
    const inputTags = input
      .split(' ')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const unknownTags = inputTags.filter(tag => !tagsItems.value.includes(tag));

    tagsItems.value = [...new Set([...tagsItems.value, ...unknownTags])];
    formData.value.tags = [...new Set([...formData.value.tags, ...inputTags])] ?? [];
  }
}

async function onFormSubmit() {
  await linksStore.addLink(formData.value);
}
</script>

<template>
  <v-form
    ref="form"
    :disabled="linksStore.loading"
    @submit.prevent="onFormSubmit"
  >
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          v-model="formData.title"
          density="compact"
          hide-details
          label="Title"
          required
          variant="underlined"
        />
      </v-col>
      <v-col
        cols="12"
        md="5"
      >
        <v-text-field
          v-model="formData.link"
          density="compact"
          hide-details
          label="Link"
          required
          variant="underlined"
        />
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-autocomplete
          v-model="formData.tags"
          :search="tagsSearch"
          :items="tagsItems"
          density="compact"
          hide-details
          label="Tags"
          variant="underlined"
          chips
          multiple
          @update:search="handleTagsSearch"
        />
      </v-col>
      <v-col
        cols="12"
        md="1"
      >
        <v-btn
          :density="(md || lg) ? 'comfortable' : 'default'"
          :icon="(md || lg) ? mdiPlus : undefined"
          :prepend-icon="!(md || lg) ? mdiPlus : undefined"
          :rounded="!(md || lg) ? 'pill' : 'circle'"
          class="float-end mt-1"
          color="primary"
          text="Add"
          type="submit"
          variant="outlined"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>
