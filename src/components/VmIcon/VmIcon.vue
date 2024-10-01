<script setup lang="ts">
import { computed } from 'vue'

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
  size: {
    type: [Number, String],
    default: 20
  }
})

const style = computed(
  () => `'FILL' ${props.filled ? '1' : '0'}, 'wght' ${props.weight}, 'GRAD' 0, 'opsz' ${props.size}`
)
</script>

<template>
  <span
    style="align-self: center"
    class="material-symbols-outlined"
    :style="{ fontVariationSettings: style }"
  >
    {{ name }}
  </span>
</template>
