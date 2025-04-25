<script
  lang="ts"
  setup
>
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { useLinksStore } from '@/stores/useLinksStore.ts';
import { isValidUrl, stringToColor } from '@/utils.ts';
import { mdiPlus } from '@mdi/js';
import { ref } from 'vue';

const linksStore = useLinksStore();

const getInitialFormState = () => ({
  url: '',
  tags: [] as string[],
});

const form = ref();
const formData = ref(getInitialFormState());

const tagsSearch = ref('');
const tagsItems = ref<string[]>([]);

const authStore = useAuthStore();

function handleTagsSearch(input: string) {
  if (input && input.includes(' ')) {
    const inputTags = input
      .split(' ')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const unknownTags = inputTags.filter(tag => !tagsItems.value.includes(tag));

    tagsItems.value = [...new Set([...tagsItems.value, ...unknownTags])];
    formData.value.tags = [...new Set([...formData.value.tags, ...inputTags])];
  }
}

async function onFormSubmit() {
  form.value.resetValidation();

  formData.value = {
    url: formData.value.url.trim(),
    tags: formData.value.tags.map(v => v.trim()),
  };

  await linksStore.addLink(formData.value);
  resetForm();
}

function resetForm() {
  form.value.reset();
  tagsSearch.value = '';
  formData.value = getInitialFormState();
}
</script>

<template>
  <v-form
    ref="form"
    class="d-flex flex-wrap ga-6"
    :disabled="linksStore.loading"
    @submit.prevent="onFormSubmit"
  >
    <v-text-field
      v-model="formData.url"
      :rules="[isValidUrl]"
      class="flex-grow-1"
      min-width="200"
      density="compact"
      hide-details
      label="Link"
      required
      variant="underlined"
    />
    <v-autocomplete
      v-model="formData.tags"
      :search="tagsSearch"
      :items="tagsItems"
      class="flex-grow-0"
      min-width="200"
      density="compact"
      hide-details
      label="Tags"
      variant="underlined"
      chips
      multiple
      @update:search="handleTagsSearch"
    >
      <template #chip="{item}">
        <v-chip :color="stringToColor(item.value, authStore.theme)">
          {{ item.value }}
        </v-chip>
      </template>
    </v-autocomplete>
    <v-btn
      :prepend-icon="mdiPlus"
      class="flex-grow-0"
      rounded="pill"
      color="primary"
      text="Add"
      type="submit"
      variant="outlined"
    />
  </v-form>
</template>

<style scoped>
    @media (max-width: 600px) {
        .v-input {
            flex-basis: 100%;
            flex-grow: 1;
        }

        .v-btn {
            margin-left: auto;
        }
    }
</style>
