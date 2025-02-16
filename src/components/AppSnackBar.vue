<script
  lang="ts"
  setup
>
import { useSnackBarStore } from '@/stores/useSnackBarStore';
import { wait } from '@/utils.ts';
import { mdiClose } from '@mdi/js';
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay();
const snackBarStore = useSnackBarStore();

const snackBarModel = ref(false);

watch(snackBarStore, ({ message }) => snackBarModel.value = !!message);

function onModelUpdate(value) {
  if (!value) {
    properClose();
  }
}

function onCloseBtnClick() {
  snackBarModel.value = false;
  properClose();
}

async function properClose() {
  await wait(300);
  snackBarStore.clear();
}
</script>

<template>
  <v-snackbar
    v-model="snackBarModel"
    :color="snackBarStore.color"
    :text="snackBarStore.message"
    :timeout="2000"
    content-class="ma-8"
    rounded="pill"
    transition="slide-y-reverse-transition"
    @update:modelValue="onModelUpdate"
  >
    <template #actions>
      <v-btn
        :icon="!mdAndUp ? mdiClose : null"
        :text="mdAndUp ? 'Close' : null"
        @click="onCloseBtnClick"
      />
    </template>
  </v-snackbar>
</template>

<style scoped>

</style>
