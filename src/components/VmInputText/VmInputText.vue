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

let focus = ref(false);
function onFocus(){
  focus.value = !focus.value;
}

</script>

<template>
  {{ ((prependIcon || prefix) && model) ? true : false }}
  <div class="vm-field">
    <div class="vm-input-field" :class="required && !model  ? 'vm-input-required' : 'vm-input-not-required'">
      <span v-if="(prefix && !model) || prefix" class="vm-input-prefix">
        {{ prefix }}
      </span>
      <slot name="prepend">
        <VmIcon v-if="prependIcon" :name="prependIcon" :color="iconColor" />
      </slot>
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
      <label :style="((prependIcon || prefix) && !focus) || ((prependIcon || prefix) && model) ? 'padding-left: 1.5rem;' : 'padding-left: 0rem;'">
        <slot name="label">
          {{ label }}
        </slot>
      </label>
      <span class="vm-input-suffix" v-if="suffix">
        {{ suffix }}
      </span>
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
