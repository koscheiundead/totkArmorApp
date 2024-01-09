<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps(['gearSlot', 'title', 'description', 'location']);
const gearSlot = props.gearSlot

const defense = ref(0);
const level = ref(0);
const notObtained = ref(true);

const obtain = () => {
  notObtained.value = !notObtained.value;
}
</script>

<template>
  <div id="item" :class="{notobtained: notObtained}">
    <h6 id="slot-placement">{{ gearSlot }}</h6>
    <button id="itemGetter" @click="obtain">{{notObtained ? "obtain" : "sell"}}</button>
    <h4 id="item-title">{{ title }}</h4>
    <p>Item: {{description}}</p>
    <p>{{location}}</p>
  </div>
</template>

<style scoped>
#item {
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
  width: 200px;
  padding: 5px;
}

.notobtained {
  opacity: 50%;
}

#itemGetter {
  font-size: xx-small;
  position: relative;
  top: -17px;
  padding: 2px;
}

#slot-placement {
  margin: 0px;
  text-align: center;
  width: auto;
}
#item-title {
  border-bottom: 1px solid black;
  text-align: center;
}
</style>
