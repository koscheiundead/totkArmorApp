<script setup>
import { defineProps } from 'vue';
import itemTile from './itemTile.vue';

const props = defineProps(["set"]);

const head = props.set.head;

const body = props.set.body;

const legs = props.set.legs;
</script>

<template>
  <div id="cluster">
    <itemTile v-if="head" gearSlot="head" :title=head.name :item=head></itemTile>
    <itemTile v-if="body" gearSlot="body" :title=body.name :item=body></itemTile>
    <itemTile v-if="legs" gearSlot="legs" :title=legs.name :item=legs></itemTile>
  </div>
</template>

<style>
#cluster {
  display: flex;
  justify-content: space-around;
  position: relative;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
