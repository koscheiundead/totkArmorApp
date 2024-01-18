<script setup>
import { computed, ref, reactive, watch } from 'vue'
import { useArmorStore } from '../stores/armorStore';

const props = defineProps(['gearSlot', 'title', 'hide']);
const emit = defineEmits(['recalculate']);
const gearSlot = props.gearSlot;

const armorStore = useArmorStore();

//compoted ref
const armor = computed(() => {
  for (const setKey in armorStore.items) {
    const set = armorStore.items[setKey];
    for (const partKey in set) {
      const item = set[partKey];
      if (item.name === props.title) {
        return item;
      }
    }
  }

  return null; //return null if item not found
});

const obtained = ref(armor.value ? armor.value.obtained : false);
const level = ref(armor.value ? armor.value.level : 0);
const ingredients = ref({});

const obtain = () => {
  obtained.value = !obtained.value
  if (!obtained.value) {
    level.value = 0;
  }
  updateArmorItem();
  emit("recalculate");

  //update the store
  armorStore.updateItem(props.item.name, armor.value)
}

watch(armor, (newArmor) => {
  if (newArmor) {
    obtained.value = newArmor.obtained;
    level.value = newArmor.level;
    ingredientsCalculator();
  }
}, { deep: true });

const updateArmorItem = () => {
  if (armor.value) {
    armorStore.updateItem(props.title, {
      ...armor.value,
      obtained: obtained.value,
      level: level.value
    });
  }
}

watch([obtained, level], () => {
  updateArmorItem();
  emit("recalculate");
}, { deep: true });

const ingredientsCalculator = () => {
  let parts = [];
  let val = armor.value
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
  if (armor.value.level < 4) {
    armor.value.level++
  }
  ingredients.value = {};
  ingredientsCalculator();
  emit("recalculate");
}
const levelDown = () => {
  if (armor.value.level > 0) {
    armor.value.level--
  }
  ingredients.value = {};
  ingredientsCalculator();
  emit("recalculate")
}

watch(() => armor, () => {
  armorStore.saveUserData();
}, { deep: true });
</script>

<template>
  <div id="item" :class="{ notobtained: !obtained }" v-if="!props.hide || item.obtained">
    <div id="topline">
      <button id="itemGetter" @click="obtain">{{ obtained ? "sell" : "obtain" }}</button>
      <h6 id="slot-placement">{{ gearSlot }}</h6>
      <h6 id="gear-level">level: {{ level }}</h6>
    </div>
    <h4 id="item-title">{{ title }}</h4>
    <p v-if="armor.description !== null && armor.description !== undefined">{{ armor.description }}</p>
    <p v-if="armor.location !== null && armor.location !== undefined">Location: {{ armor.location }}</p>
    <div v-if="armor.level1">
      <div v-if="obtained">
        <button @click="levelUp" v-if="level < 4">level up</button>
        <button @click="levelDown" v-if="level > 0">level down</button>
      </div>
      <p v-if="level < 4">Items to max level:</p>
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
