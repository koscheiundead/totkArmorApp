<script setup>
import { useArmorStore } from '../stores/armorStore';
import { onMounted } from 'vue';
import CoreApp from './coreApp.vue';

const armorStore = useArmorStore();

onMounted(async () => {
  if (armorStore.isLoading) {
    await armorStore.loadUserData();
  }
})
</script>
<template>
  <div v-if="!armorStore.isLoading">
    <CoreApp></CoreApp>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
