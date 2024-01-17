<script setup>
import { ref, reactive, inject } from 'vue'

const props = defineProps(['gearSlot', 'title', 'item']);
const emit = defineEmits(['recalculate']);
const gearSlot = props.gearSlot;

const armorItems = inject("armoritems");

const armor = reactive(props.item);
const defense = ref(armor.defence);
const description = armor.description;
const location = armor.location;
const obtained = ref(armor.obtained);

const obtain = () => {
  armor.obtained = !armor.obtained;
  obtained.value = armor.obtained;
  if (!armor.obtained) armor.level = 0;
  emit("recalculate");
}

const ingredients = ref({});
const ingredientsCalculator = () => {
  let parts = [];
  let val = armor
  if (val.level1 && val.level < 1) {
    for (const [key, value] of Object.entries(val.level1)) {
      ;
      if (parts[key] === undefined) {
        parts[key] = value;
      } else {
        parts[key] += value;
      }
    }
  }
  if (val.level2 && val.level < 2) {
    for (const [key, value] of Object.entries(val.level2)) {
      ;
      if (parts[key] === undefined) {
        parts[key] = value;
      } else {
        parts[key] += value;
      }
    }
  }
  if (val.level3 && val.level < 3) {
    for (const [key, value] of Object.entries(val.level3)) {
      ;
      if (parts[key] === undefined) {
        parts[key] = value;
      } else {
        parts[key] += value;
      }
    }
  }
  if (val.level4 && val.level < 4) {
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

const levelUp = () => {
  if (armor.level < 4) {
    armor.level++
  }
  ingredients.value = {};
  ingredientsCalculator();
  emit("recalculate");
}
const levelDown = () => {
  if (armor.level > 0) {
    armor.level--
  }
  ingredients.value = {};
  ingredientsCalculator();
  emit("recalculate")
}
</script>

<template>
  <div id="item" :class="{ notobtained: !obtained }">
    <div id="topline">
      <button id="itemGetter" @click="obtain">{{ obtained ? "sell" : "obtain" }}</button>
      <h6 id="slot-placement">{{ gearSlot }}</h6>
      <h6 id="gear-level">level: {{ armor.level }}</h6>
    </div>
    <h4 id="item-title">{{ title }}</h4>
    <p v-if="description !== null && description !== undefined">{{ description }}</p>
    <p v-if="location !== null && location !== undefined">Location: {{ location }}</p>
    <div v-if="armor.level1">
      <div v-if="armor.obtained">
        <button @click="levelUp" v-if="armor.level < 4">level up</button>
        <button @click="levelDown" v-if="armor.level > 0">level down</button>
      </div>
      <p v-if="armor.level < 4">Items to max level:</p>
      <ul v-if="ingredients">
        <li v-for="(value, key) in ingredients">{{ value }} {{ key }}</li>
      </ul>
    </div>
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
