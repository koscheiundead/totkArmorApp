<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps(['gearSlot', 'title', 'description', 'location', 'item']);
const gearSlot = props.gearSlot

const armor = props.item;
const defense = ref(armor.defence);
const obtained = ref(armor.obtained);

const obtain = () => {
  obtained.value = !obtained.value;
}

const ingredients = ref({});
const ingredientsCalculator = () => {
  let parts = [];
  let val = armor
  if (val.level1) {
    for (const [key, value] of Object.entries(val.level1)) {
      ;
      if (parts[key] === undefined) {
        parts[key] = value;
      } else {
        parts[key] += value;
      }
    }
  }
  if (val.level2) {
    for (const [key, value] of Object.entries(val.level2)) {
      ;
      if (parts[key] === undefined) {
        parts[key] = value;
      } else {
        parts[key] += value;
      }
    }
  }
  if (val.level3) {
    for (const [key, value] of Object.entries(val.level3)) {
      ;
      if (parts[key] === undefined) {
        parts[key] = value;
      } else {
        parts[key] += value;
      }
    }
  }
  if (val.level3) {
    for (const [key, value] of Object.entries(val.level3)) {
      ;
      if (parts[key] === undefined) {
        parts[key] = value;
      } else {
        parts[key] += value;
      }
    }
  }
  if (val.level4) {
    for (const [key, value] of Object.entries(val.level4)) {
      ;
      if (parts[key] === undefined) {
        parts[key] = value;
      } else {
        parts[key] += value;
      }
    }
  }

  for (const [key, value] of Object.entries(parts)) {
    if (key !== "defense") ingredients.value[key] = value;
  }
};
ingredientsCalculator();
</script>

<template>
  <div id="item" :class="{ notobtained: !obtained }">
    <div id="topline">
      <button id="itemGetter" @click="obtain">{{ obtained ? "sell" : "obtain" }}</button>
      <h6 id="slot-placement">{{ gearSlot }}</h6>
      <h6 id="gear-level">level: {{ armor.level }}</h6>
    </div>
    <h4 id="item-title">{{ title }}</h4>
    <p>Item: {{ description }}</p>
    <p>Location: {{ location }}</p>
    <p v-if="armor.level1 && armor.level < 4">Items to max level:</p>
    <ul v-if="ingredients">
      <li v-for="(value, key) in ingredients">{{ value }} {{ key }}</li>
    </ul>
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

#topline {
  display: inline-flex;
  align-items: start;
  height: 20px;
  justify-content: space-between;
  margin: 0px !important;
  padding: 0px !important;
  width: 200px;
}

#itemGetter {
  font-size: xx-small;
  position: relative;
  width: 40px;
}

#slot-placement {
  margin: 0px;
  text-align: center;
  width: auto;
}

#item-title {
  border-bottom: 1px solid black;
  height: 18px;
  margin: 0px;
  position: relative;
  text-align: center;
}

#gear-level {
  position: relative;
  top: -24px;
}
</style>
