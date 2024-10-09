<script setup lang="ts">
import type { FormCommon } from '@/core/form'
import { provide, ref, type InjectionKey, type Ref } from 'vue'

defineOptions({
  name: 'VmForm'
})

defineProps({})

const key = Symbol('vmFormCommon') as InjectionKey<FormCommon>

provide(key, {
  register: register,
  unregister: unregister
})

const components: Ref<Array<any>> = ref([])

function register(cmp: any) {
  if (cmp) {
    components.value.push(cmp)
  }
}
function unregister(cmp: any) {
  const index = components.value.findIndex((c) => c === cmp)
  if (index >= 0) {
    components.value.splice(index, 1)
  }
}
</script>

<template>
  <form>
    <slot />
  </form>
</template>
