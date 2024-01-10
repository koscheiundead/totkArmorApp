<script setup>
import { reactive, ref, defineProps, computed } from 'vue';
const props = defineProps(['armor']);
const setObj = props.armor;

const ingredients = reactive({});
const obtainedOnly = ref(false);

const ingredientsCalculator = () => {
  const sets = [];
  for (const [key] of Object.entries(setObj)) sets.push(key);

  const parts = {};
  for (const key of sets) {
    let headParts = miniCalc(setObj[key].head);
    let bodyParts = miniCalc(setObj[key].body);
    let legsParts = miniCalc(setObj[key].legs);

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
    if (key !== "defense") ingredients[key] = value;
  }
};
const miniCalc = val => {
  if (val === undefined) return;
  const parts = {};
  if (val.obtained && obtainedOnly || !obtainedOnly) {
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
}
ingredientsCalculator();
</script>

<template>
  <div id="recap-panel">
    <input type="checkbox" name="obtained-box" v-model="obtainedOnly"><label for="obtained-box">Obtained only</label>
    <h4>Item Summary</h4>
    <ul>
      <li v-for="(value, key) in ingredients">{{ value }} {{ key }}</li>
    </ul>
  </div>
</template>

<style scoped>
#recap-panel {
  background-color: bisque;
  border: 2px solid black;
  border-radius: 5px;
  left: 5px;
  opacity: 75%;
  position: sticky;
  top: 5px;
  width: 225px;
}

h4 {
  text-align: center;
}

label {
  font-size: smaller;
}
</style>
