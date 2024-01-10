<script setup>
import { ref, reactive } from 'vue';
import armorSets from "./data/armor.json";
import setTiles from './components/setTiles.vue';
import leftPanel from './components/leftPanel.vue';

const armorObj = armorSets;
const panelOpen = ref(true);
</script>

<template>
  <button id="left-panel-hide" @click="panelOpen = !panelOpen"><span v-if="panelOpen">hide</span><span v-else>show</span> sidebar</button>
  <div v-if=panelOpen id="left-panel-wrapper">
    <leftPanel :armor=armorObj></leftPanel>
  </div>
  <div id="set-wrapper" :class="{ leftpanel : panelOpen }">
    <setTiles v-for="(armor, index) in armorObj" :key="index" :set=armor></setTiles>
  </div>
</template>

<style>
:root {
  background-color: rebeccapurple;
}

#left-panel-wrapper {
  left: 0px;
  top: 0px;
}

.leftpanel {
  position: absolute;
  left: 250px;
  top: 0px;
}

#left-panel-hide {
  background-color: bisque;
  border: 2px solid;
  border-radius: 5px;
  font-size: small;
}
</style>
