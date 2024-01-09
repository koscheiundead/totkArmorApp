<script setup>
import { defineProps } from 'vue';
import itemTile from './itemTile.vue';

const head = "HEAD";
const body = "BODY";
const legs = "LEGS";
</script>

<template>
  <div id="cluster">
    <itemTile :gearSlot=head title="title" description="a description of the item" location="123x, 213y, 321z"></itemTile>
    <itemTile :gearSlot=body title="title" description="a description of the item" location="123x, 213y, 321z"></itemTile>
    <itemTile :gearSlot=legs title="title" description="a description of the item" location="123x, 213y, 321z"></itemTile>
  </div>
</template>

<style>
#cluster {
display: inline-flex;
left: 50px;
justify-content: space-around;
position: absolute;
right: 50px;
}
</style>
