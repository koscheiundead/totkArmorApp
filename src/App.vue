<script setup>
import { ref, reactive } from 'vue';
import itemTile from './components/itemTile.vue';

let armorItems;
async function loadData() {
  let data;

  try {
    data = await window.api.invoke('read-file', 'userData.json');
  } catch (userDataError) {
    console.error("Error reading user data:", userDataError);
  }

  if (!data) {
    try {
      data = await window.api.invoke("read-file", "../data/armor.json");
    } catch (templateError) {
      console.error("Error loading user data:", templateError);
      return;
    }
  }

  try {
    armorItems = JSON.parse(data);
  } catch (parseError) {
    console.error("Error parsing JSON data:", parseError);
  }
}


const show = ref(true);
const toggleShow = () => {
  show.value = !show.value
}

const obtainedToggle = ref(false);
const toggleObtained = () => {
  obtainedToggle.value = !obtainedToggle.value;
}

const ingredients = ref({});

const ingredientsCalculator = () => {
  const sets = [];
  for (const [key] of Object.entries(armorItems)) sets.push(key);

  const parts = {};
  for (const key of sets) {
    let headParts = miniCalc(armorItems[key].head);
    let bodyParts = miniCalc(armorItems[key].body);
    let legsParts = miniCalc(armorItems[key].legs);

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
    if (val.level1) {
      for (const [key, value] of Object.entries(val.level1)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value
        }
      }
    }
    if (val.level2) {
      for (const [key, value] of Object.entries(val.level2)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value
        }
      }
    }
    if (val.level3) {
      for (const [key, value] of Object.entries(val.level3)) {
        if (parts[key]) {
          parts[key] += value;
        } else {
          parts[key] = value
        }
      }
    }
    if (val.level4) {
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
let loading = ref(true);
loadData().then(() => {
  armorObj = armorItems;
  ingredientsCalculator();
  loading.value = false;
});
</script>

<template>
  <div v-if="!loading" id="loaded-wrapper">
    <div id="hide-summary" :class="{ moveDown: !show }">
      <input type="checkbox" name="hide-box" @click="toggleShow()"><label for="hide-box"><span
          v-if="show === true">hide</span><span v-else>hide</span> side panel</label>
    </div>
    <div id="left-panel" v-if="show">
      <div id="recap-panel" v-if="!loading">
    <input type="checkbox" name="obtained-box" @click="toggleObtained()"><label for="obtained-box">Obtained only</label>
    <h4>Item Summary</h4>
    <ul>
      <li v-for="(value, key) in ingredients">{{ value }} {{ key }}</li>
    </ul>
  </div>
    </div>
    <div id="set-tiles-wrapper">
      <div id="cluster" v-for="(armor, index) in armorObj" :key="index">
        <itemTile v-if="armor.head" gearSlot="head" :title=armor.head.name :item=armor.head></itemTile>
        <itemTile v-if="armor.body" gearSlot="body" :title=armor.body.name :item=armor.body></itemTile>
        <itemTile v-if="armor.legs" gearSlot="legs" :title=armor.legs.name :item=armor.legs></itemTile>
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
  justify-content: space-around;
  margin-top: 0px;
  padding-top: 0px;
  top: 0px;
  width: 700px;
  background-color: pink;
}

#cluster {
  display: flex;
  align-content: space-between;
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
  top: 21px;
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
  opacity: 75%;
  position: sticky;
  width: 225px;
}

#recap-panel h4 {
  text-align: center;
}

#recap-panel label {
  font-size: smaller;
}
</style>
