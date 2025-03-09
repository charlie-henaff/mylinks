<script
  lang="ts"
  setup
>
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { useLinksStore } from '@/stores/useLinksStore.ts';
import { isValidUrl, stringToColor } from '@/utils.ts';
import { mdiPlus } from '@mdi/js';
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

const { md, lg } = useDisplay();
const linksStore = useLinksStore();

const getInitialFormState = () => ({
  title: '',
  link: '',
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
    formData.value.tags = [...new Set([...formData.value.tags, ...inputTags])] ?? [];
  }
}

async function onFormSubmit() {
  form.value.resetValidation();

  formData.value = {
    title: formData.value.title.trim(),
    link: formData.value.link.trim(),
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
          variant="underlined"
        />
      </v-col>
      <v-col
        cols="12"
        md="5"
      >
        <v-text-field
          v-model="formData.link"
          :rules="[isValidUrl]"
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
        >
          <template #chip="{item}">
            <v-chip :color="stringToColor(item.value, authStore.theme)">
              {{ item.value }}
            </v-chip>
          </template>
        </v-autocomplete>
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
