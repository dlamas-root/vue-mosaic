<script setup lang="ts">
import { computed, ref, type ModelRef, type Ref } from 'vue'
import VmIcon from '../VmIcon/VmIcon.vue'
import VmField from '../VmField/VmField.vue'

defineOptions({
  name: 'VmInputText'
})

const model: ModelRef<string | undefined> = defineModel<string>()

const props = defineProps({
  id: String,
  appendIcon: String,
  prependIcon: String,
  counter: Boolean,
  maxLength: [Number, String],
  disabled: Boolean,
  hint: String,
  label: String,
  loading: Boolean,
  name: String,
  prefix: String,
  readonly: Boolean,
  required: Boolean,
  rules: Array<Function>,
  suffix: String,
  iconColor: String,
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => ['text', 'password'].includes(value)
  }
})

const showPassword: Ref<boolean> = ref(false)

const inputType = computed(() =>
  props.type === 'password' && showPassword.value ? 'text' : props.type
)
const count = computed(() => model.value?.length || 0)

let focus = ref(false)
function onFocus() {
  focus.value = !focus.value
}
</script>

<template>
  <VmField
    :appendIcon
    :prependIcon
    :counter
    :counterActual="count"
    :counterMax="maxLength"
    :hint
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
      :readonly
      :required
      :type="inputType"
      :maxlength="maxLength"
      :class="{ 'pl-5': prependIcon }"
      @focus="onFocus"
      @focusout="onFocus"
    />
    <template #prepend>
      <slot name="prepend" />
    </template>
    <template #append>
      <slot name="append">
        <span
          v-if="!appendIcon && type === 'password'"
          class="vm-icon-field"
          @click="showPassword = !showPassword"
        >
          <Transition name="zoom-fade-in" mode="out-in">
            <VmIcon
              v-if="showPassword"
              id="visibility"
              name="visibility"
              opticalSize="20"
              size="22px"
              filled
              :color="iconColor"
            />
            <VmIcon
              v-else
              id="visibility-off"
              name="visibility_off"
              opticalSize="20"
              size="22px"
              filled
              :color="iconColor"
            />
          </Transition>
        </span>
      </slot>
    </template>
    <template #label>
      <slot name="label" />
    </template>
  </VmField>
</template>
