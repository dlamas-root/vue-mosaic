<script setup lang="ts">
import type { Rule } from '@/core/form'
import VmField from '../VmField/VmField.vue'
import { ref, type ModelRef, type Ref } from 'vue'

const model: ModelRef<any | any[] | undefined> = defineModel()

defineProps({
  id: String,
  appendIcon: String,
  prependIcon: String,
  counter: Boolean,
  disabled: Boolean,
  hint: String,
  label: String,
  loading: Boolean,
  name: String,
  prefix: String,
  readonly: Boolean,
  required: Boolean,
  rules: Array<Rule>,
  suffix: String,
  iconColor: String
})

const errorMessage: Ref<string | undefined> = ref()
const showOptions: Ref<boolean> = ref(false)
</script>

<template>
  <VmField
    :appendIcon
    :prependIcon
    :counter
    :hint
    :error="errorMessage"
    :label
    :loading
    :prefix
    :suffix
    :iconColor
  >
    <input
      v-model="model"
      :id
      :name
      :disabled
      readonly
      :required
      :style="{ paddingLeft: prependIcon && '0px' }"
      @click="showOptions = !showOptions"
    />
  </VmField>
  <Transition>
    <div :key="'select_' + showOptions" v-show="showOptions" class="vm-select-options">
      <slot/>
    </div>
  </Transition>
</template>

<style lang="scss">
.vm-select-options {
  padding: 5px 0;
  background: white;
  position: absolute;
  width: inherit;
  z-index: 100;
  border: solid 1px black
}
</style>