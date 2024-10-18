<script setup lang="ts">
import { ref } from 'vue'
import VmInputText from './components/VmInputText/VmInputText.vue'
import VmSelect from './components/VmSelect/VmSelect.vue'

const hint = ref()

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
    <VmInputText
      label="Password"
      counter
      required
      max-length="20"
      :hint="hint"
      type="password"
      prefix="hi"
      :rules="[checkRequired]"
    />
    <VmSelect label="Select" required>
      <option value="Al">Algo</option>
    </VmSelect>
    <button @click="toggleHint" style="margin-top: 1rem">Click</button>
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
