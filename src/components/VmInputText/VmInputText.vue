<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import VmIcon from '../VmIcon/VmIcon.vue'

defineOptions({
  name: 'VmInputText'
})

const model = defineModel<String>()

const props = defineProps({
  id: String,
  appendIcon: String,
  counter: Boolean,
  maxLength: [Number, String],
  disabled: Boolean,
  hint: String,
  label: String,
  loading: Boolean,
  name: String,
  prefix: String,
  prependIcon: String,
  readonly: Boolean,
  required: Boolean,
  rules: Array<Function>,
  suffix: String,
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
</script>

<template>
  <div class="vm-field">
    <div class="vm-input-field">
      <slot name="prepend">
        <VmIcon v-if="prependIcon" :name="prependIcon" />
      </slot>
      <span v-if="prefix" class="vm-input-prefix">
        {{ prefix }}
      </span>
      <input
        v-model="model"
        :id
        :name
        :disabled
        :readonly
        :required
        :type="inputType"
        :maxlength="maxLength"
      />
      <label :class="{ 'vm-label-focused': prefix }">
        <slot name="label">
          {{ label }}
        </slot>
      </label>
      <span class="vm-input-suffix" v-if="suffix">
        {{ suffix }}
      </span>
      <slot name="append">
        <VmIcon v-if="appendIcon" :name="appendIcon" />
        <span
          v-else-if="type === 'password'"
          class="vm-icon-field"
          @click="showPassword = !showPassword"
        >
          <VmIcon :name="showPassword ? 'visibility_off' : 'visibility'" size="20" filled />
        </span>
      </slot>
    </div>
    <div class="vm-hint-field">
      <span class="vm-hint-message">{{ hint }}</span>
      <div v-if="counter" class="vm-hint-counter">
        {{ count }}<span v-if="maxLength">/{{ maxLength }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.vm-field {
  .vm-input-field {
    position: relative;
    border-bottom: 2px solid gainsboro;
    margin: 15px 0 0 0;
    transition: 0.15s ease;
    display: flex;
    flex-direction: row;

    label {
      position: absolute;
      top: 52%;
      left: 2px;
      transform: translateY(-50%);
      color: #703a3a;
      font-size: 14px;
      pointer-events: none;
      transition: 0.15s ease;

      &.vm-label-focused {
        font-size: 0.7rem;
        top: 10px;
        transform: translateY(-120%);
      }
    }

    &:has(> input:focus, input:valid) {
      border-bottom: 2px solid #ac3f3f;
    }

    input {
      width: 100%;
      height: 30px;
      background: transparent;
      border: none;
      outline: none;
      font-size: 16px;
      color: #000;

      &:focus,
      &:valid {
        ~ label {
          font-size: 0.7rem;
          top: 10px;
          transform: translateY(-120%);
        }
      }

      &:required ~ label::after {
        content: ' *';
      }
    }
    span.vm-input-prefix {
      align-self: center;
      margin: 0 5px 0 0;
    }
    span.vm-input-suffix {
      align-self: center;
      margin: 0 5px;
    }
    span.vm-icon-field {
      margin-top: 3px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
  .vm-hint-field {
    display: flex;
    flex-direction: row;
    font-size: 12px;
    justify-content: space-between;

    .vm-hint-message {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .vm-hint-counter {
      margin-left: 10px;
      margin-top: 2px;
      color: #703a3a;
    }
  }
}
</style>
