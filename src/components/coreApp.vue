<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import { useArmorStore } from '../stores/armorStore';
import itemTile from './itemTile.vue';

const armorStore = useArmorStore();
onMounted(async () => {
  await armorStore.loadUserData();
})

const show = ref(true);
const toggleShow = () => {
  show.value = !show.value
}

const obtainedToggle = ref(false);
const toggleObtained = () => {
  obtainedToggle.value = !obtainedToggle.value;
  ingredients.value = {};
  ingredientsCalculator();
}

const ingredients = ref({});

const ingredientsCalculator = () => {
  const sets = [];
  for (const [key] of Object.entries(armorStore.items)) sets.push(key);

  const parts = {};
  for (const key of sets) {
    let headParts = miniCalc(armorStore.items[key].head);
    let bodyParts = miniCalc(armorStore.items[key].body);
    let legsParts = miniCalc(armorStore.items[key].legs);

    if (headParts !== undefined) {
      for (const [key, value] of Object.entries(headParts)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value;
        }
      }
    }
    if (bodyParts !== undefined) {
      for (const [key, value] of Object.entries(bodyParts)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value;
        }
      }
    }
    if (legsParts !== undefined) {
      for (const [key, value] of Object.entries(legsParts)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value;
        }
      }
    }
  }

  for (const [key, value] of Object.entries(parts)) {
    if (key !== "defense") ingredients.value[key] = value;
  }
};
const miniCalc = (val) => {
  if (val === undefined) return;
  const parts = {};
  if (val.obtained && obtainedToggle.value || !obtainedToggle.value) {
    if (val.level1 && val.level < 1) {
      for (const [key, value] of Object.entries(val.level1)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value
        }
      }
    }
    if (val.level2 && val.level < 2) {
      for (const [key, value] of Object.entries(val.level2)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value
        }
      }
    }
    if (val.level3 && val.level < 3) {
      for (const [key, value] of Object.entries(val.level3)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value
        }
      }
    }
    if (val.level4 && val.level < 4) {
      for (const [key, value] of Object.entries(val.level4)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value
        }
      }
    }
  }
  return parts;
};

let armorObj;
armorObj = reactive(armorStore.items);

ingredients.value = {};
ingredientsCalculator();


const calcAgain = () => {
  ingredients.value = {};
  ingredientsCalculator();
}

const hideUnobtained = ref(false);
const toggleUnobtained = () => {
  hideUnobtained.value = !hideUnobtained.value;
}

const resetProgress = () => {
  armorStore.reset();
}

watch(() => armorStore.items, () => {
  ingredientsCalculator();
}, { deep: true });
</script>

<template>
  <div id="loaded-wrapper">
    <div v-if="!show" id="hidden-side-panel">
      <input type="checkbox" id="hide-box" @change="toggleShow">
      <label for="hide-box">show side panel</label>
    </div>
    <div id="left-panel" v-if="show">
      <div id="recap-panel">
        <input type="checkbox" id="obtained-box" @change="toggleObtained"><label for="obtained-box">Obtained
          only</label>
          <div id="shown-side-panel">
            <input type="checkbox" id="shown-box" @change="toggleShow"><label for="shown-box">hide side panel</label>
          </div>
        <h4>Item Summary</h4>
        <ul>
          <li v-for="(value, key) in ingredients" :key="key">{{ value }} {{ key }}</li>
        </ul>
      </div>
    </div>
    <div id="unobtained-items-wrapper">
      <input type="checkbox" id="unobtained-hide" @change="toggleUnobtained">
      <label id="unobtained-hide-label" for="unobtained-hide">hide unobtained items</label>
      <button id="reset-progress" @click="resetProgress">reset items</button>
    </div>
    <div id="set-tiles-wrapper">
      <div id="cluster" v-for="(armor, index) in armorObj" :key="index">
        <itemTile class="itemTile" v-if="armor.head" gearSlot="head" :hide=hideUnobtained :title=armor.head.name :item=armor.head
          @recalculate="calcAgain">
        </itemTile>
        <itemTile class="itemTile" v-if="armor.body" gearSlot="body" :hide=hideUnobtained :title=armor.body.name :item=armor.body
          @recalculate="calcAgain">
        </itemTile>
        <itemTile class="itemTile" v-if="armor.legs" gearSlot="legs" :hide=hideUnobtained :title=armor.legs.name :item=armor.legs
          @recalculate="calcAgain">
        </itemTile>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --primary-bg-color: #342E37;
  --secondary-bg-color: #4D426D;
  --accent-color: #8B9A68;
  --text-color: #EAE0D5;
  --font-primary: 'Merriweather', serif;
  --font-secondary: 'Montserrat', sans-serif;
  --panel-width: 250px;
}

body {
  font-family: var(--font-primary);
  color: var(--text-color);
  background-color: var(--primary-bg-color);
}

#loaded-wrapper {
  display: flex;
}

#left-panel {
  margin-top: 5px;
  padding: 20px;
}

#set-tiles-wrapper {
  flex-grow: 1;
  overflow: auto;
  margin-top: 5px;
  padding: 20px;
}

#cluster {
  display: flex;
  flex-wrap: nowrap;
  gap: 30px;
  justify-content: center;
  margin-bottom: 30px;
}

.itemTile {
  flex: 1 1 calc(33.333% - 40px);
  max-width: calc(33.333% - 40px);
}

#hidden-side-panel {
  font-size: smaller;
  left: 275px;
  position: absolute;
  top: 4px;
}

#unobtained-items-wrapper {
  font-size: smaller;
  position: absolute;
  top: -5px;
}

#recap-panel {
  background-color: var(--secondary-bg-color);
  border: 1px solid #444;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
  padding: 15px;
  width: var(--panel-width);
}

#recap-panel h4 {
  font-family: var(--font-secondary);
  color: var(--accent-color);
  margin-bottom: 15px;
}

#reset-progress {
  background-color: var(--accent-color);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: smaller;
  margin-left: 10px;
  margin-top: 10px;
  padding: 5px 10px;
}

input[type="checkbox"] {
  visibility: hidden;
  position: relative;
}

input[type="checkbox"] + label {
  cursor: pointer;
  padding-left: 25px;
  position: relative;
}

input[type="checkbox"] + label:before {
  background-color: var(--secondary-bg-color);
  border: 2px solid var(--accent-color);
  border-radius: 3px;
  content: '';
  height: 10px;
  left: 3px;
  position: absolute;
  top: 1px;
  width: 10px;
}

input[type="checkbox"]:checked + label:before {
  background-color: var(--accent-color);
}

input[type="checkbox"]:checked + label:after {
  border: solid white;
  border-width: 0 3px 3px 0;
  content: '';
  height: 5px;
  left: 6px;
  position: absolute;
  top: 3px;
  transform: rotate(45deg);
  width: 3px;
}
</style>
