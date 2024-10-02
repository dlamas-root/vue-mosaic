<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'VmIcon'
})

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  filled: Boolean,
  weight: {
    type: [Number, String],
    default: 400
  },
  opticalSize: {
    type: [Number, String],
    default: 20
  },
  color: {
    type: String,
    default: 'black',
  },
  size: {
    type: String,
  }
})

const style = computed(
  () => `'FILL' ${props.filled ? '1' : '0'}, 'wght' ${props.weight}, 'GRAD' 0, 'opsz' ${props.opticalSize}`
)
</script>

<template>
  <span
    style="align-self: center"
    class="material-symbols-outlined icon"
    :style="{ fontVariationSettings: style, fontSize: size, color: color}"
  >
    {{ name }}
  </span>
</template>
