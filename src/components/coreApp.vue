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
    <div id="hide-summary" :class="{ moveDown: !show }">
      <input type="checkbox" name="hide-box" @click="toggleShow()"><label for="hide-box"><span
          v-if="show === true">hide</span><span v-else>hide</span> side panel</label>
    </div>
    <div id="left-panel" v-if="show">
      <div id="recap-panel">
        <input type="checkbox" name="obtained-box" @click="toggleObtained()"><label for="obtained-box">Obtained
          only</label>
        <h4>Item Summary</h4>
        <ul>
          <li v-for="(value, key) in ingredients">{{ value }} {{ key }}</li>
        </ul>
      </div>
    </div>
    <div id="set-tiles-wrapper">
      <div id="unobtained-items-wrapper">
        <input type="checkbox" id="unobtained-hide" name="hide-unobtained" @click="toggleUnobtained()"><label
          id="unobtained-hide-label" for="hide-unobtained">hide unobtained items</label>
        <button id="save-progress" @click="resetProgress">reset</button>
      </div>
      <div id="cluster" v-for="(armor, index) in armorObj" :key="index">
        <itemTile v-if="armor.head" gearSlot="head" :hide=hideUnobtained :title=armor.head.name :item=armor.head
          @recalculate="calcAgain">
        </itemTile>
        <itemTile v-if="armor.body" gearSlot="body" :hide=hideUnobtained :title=armor.body.name :item=armor.body
          @recalculate="calcAgain">
        </itemTile>
        <itemTile v-if="armor.legs" gearSlot="legs" :hide=hideUnobtained :title=armor.legs.name :item=armor.legs
          @recalculate="calcAgain">
        </itemTile>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  background-color: rebeccapurple;
}

#left-panel {
  position: relative;
  top: 10px;
}

#set-tiles-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding-top: 0px;
  top: 0px;
  width: 700px;
}

#cluster {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 5px;
  position: relative;
  width: 700px;
}

#loaded-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: nowrap;
  width: 95vw;
}

#hide-summary {
  font-size: smaller;
  left: 125px;
  position: absolute;
  top: 26px;
  z-index: 1;
}

.moveDown {
  left: 15px !important;
}


#recap-panel {
  background-color: bisque;
  border: 2px solid black;
  border-radius: 5px;
  left: 5px;
  margin-top: 5px;
  opacity: 75%;
  position: sticky;
  width: 225px;
}

#recap-panel h4 {
  margin-top: 25px;
  text-align: center;
}

#recap-panel label {
  font-size: smaller;
}

#unobtained-items-wrapper {
  font-size: small;
  position: absolute;
  left: 15px;
  top: 0px;
}

#save-progress {
  font-size: smaller;
  left: 150px;
  padding: 0px 2px;
  position: absolute;
  top: 3px;
}
</style>
