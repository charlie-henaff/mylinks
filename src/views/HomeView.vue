<script
  lang="ts"
  setup
>
import AddLinkForm from '@/components/AddLinkForm.vue';
import { useLinksStore } from '@/stores/useLinksStore.ts';
import { onBeforeUnmount, onMounted } from 'vue';
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay();

const linksStore = useLinksStore();

onMounted(() => {
  linksStore.subscribeToLinks();
});

onBeforeUnmount(() => {
  linksStore.unsubscribeFromLinks();
});
</script>

<template>
  <v-container>
    <v-sheet
      v-if="mdAndUp"
      max-width="1500"
    >
      <div class="px-8">
        <AddLinkForm />
      </div>
    </v-sheet>
    <v-expansion-panels v-else>
      <v-expansion-panel>
        <v-expansion-panel-title>
          Add
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <AddLinkForm />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row class="mt-6">
      <v-col
        v-for="link in linksStore.links"
        :key="link.id"
        cols="12"
        md="4"
      >
        <v-card rounded="xl" class="px-1 py-2">
          <v-card-title>{{ link.title }}</v-card-title>
          <v-card-subtitle>{{ link.link }}</v-card-subtitle>
          <v-card-text>
            <div>
              <strong>Tags:</strong> {{ link.tags.join(', ') }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="editLink(link.id)"
            >
              Edit
            </v-btn>
            <v-btn
              color="error"
              @click="linksStore.deleteLink(link.id)"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
