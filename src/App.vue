<script setup lang="ts">
import { ref } from 'vue'
import VmInputText from './components/VmInputText/VmInputText.vue';
import VmInputNumber from './components/VmInputNumber/VmInputNumber.vue';
import VmSelect from './components/VmSelect/VmSelect.vue';
import VmCheckbox from './components/VmCheckbox/VmCheckbox.vue';
import VmBtn from './components/VmBtn/VmBtn.vue';
import VmList from './components/VmList/VmList.vue';
import VmListItem from './components/VmList/VmListItem.vue';
import VmListGroup from './components/VmList/VmListGroup.vue';
import VmIcon from './components/VmIcon/VmIcon.vue';

const hint = ref()
const check = ref()

function toggleHint() {
  if (hint.value) {
    hint.value = undefined
  } else {
    hint.value = 'Example'
  }
}

function checkRequired(value: string | undefined) {
  return (!!value && value.length > 0) || 'This field is required'
}
</script>

<template>
  <div style="width: 300px; padding: 100px">
    <VmBtn rounded icon="star" type="flat" :iconSize="20" style="margin: 0.5rem;" />
    <VmBtn rounded icon="star" style="margin: 0.5rem;" type="outlined" />
    <VmBtn rounded icon="star" :iconSize="30" style="margin: 0.5rem;" />
    <VmBtn  :iconSize="30" :rounded="40" style="margin: 0.5rem;" />
    <VmBtn  :iconSize="30" :rounded="30" style="margin: 0.5rem;" type="outlined"/>
    <VmBtn  :iconSize="30" size="24" :rounded="10" style="margin: 0.5rem;" type="flat"/>

    <VmInputText
      label="Password"
      counter
      required
      max-length="20"
      :hint="hint"
      type="password"
      :rules="[checkRequired]"
    />

    <VmInputNumber
      label="percentage"
      required
      :hint="hint"
      type="percentage"
    />
    <VmInputNumber
      label="int"
      required
      :hint="hint"
      type="int"
    />
    <VmInputNumber
      label="float"
      required
      :hint="hint"
      decimals="2"
      type="float"
    />
    <VmInputNumber
      label="money"
      required
      :hint="hint"
      decimals="2"
      type="money"
    />
    <button @click="toggleHint" style="margin-top: 1rem;">Click</button>

    <VmSelect label="Select" required>
      <option value="Al">Algo</option>
      <option value="Al">Blah</option>
      <option value="Al">Hi</option>
      <option value="Al">Bye</option>
    </VmSelect>
    <VmCheckbox v-model="check" required :hint="hint"> My Label </VmCheckbox>
    <button @click="toggleHint" style="margin-top: 1rem">Click</button>

    <VmList>
      <VmListItem>
        Item
      </VmListItem>
      <VmListGroup>
        <template #prepend>
          <VmIcon name="home" size="20px"/>
        </template>
        <VmListItem>
          Item 2
        </VmListItem>
      </VmListGroup>
    </VmList>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
