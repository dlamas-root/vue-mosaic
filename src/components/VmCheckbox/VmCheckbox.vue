<script setup lang="ts">
import type { Rule } from '@/core/form'
import { computed, type ModelRef } from 'vue'

const model: ModelRef<boolean | undefined> = defineModel()

const props = defineProps({
  id: String,
  disabled: Boolean,
  hint: String,
  indeterminate: Boolean,
  loading: Boolean,
  name: String,
  readonly: Boolean,
  required: Boolean,
  rules: Array<Rule>
})

// The condition evaluated in body computed its to enhancement performance
const checkClasses = computed((oldValue: any) => {
  const newValue = {
    'vm-checked': model.value,
    'vm-indeterminate': props.indeterminate,
    'vm-required': props.required
  }
  if (
    oldValue &&
    oldValue['vm-checked'] === newValue['vm-checked'] &&
    oldValue['vm-indeterminate'] === newValue['vm-indeterminate'] &&
    oldValue['vm-required'] === newValue['vm-required']
  ) {
    return oldValue
  }
  return newValue
})

function toggleCheck() {
  if (!props.disabled) {
    model.value = !model.value
  }
}
</script>

<template>
  <div class="vm-checkbox-field">
    <div class="vm-checkbox" :class="[checkClasses]">
      <div class="vm-checkbox-container" @click.stop="toggleCheck">
        <input
          :id
          :disabled
          :readonly
          :name
          :required
          v-model="model"
          type="checkbox"
          :indeterminate.prop="indeterminate"
        />
      </div>
      <label class="vm-checkbox-label" :for="id" v-if="$slots.default" @click.prevent="toggleCheck">
        <slot />
      </label>
    </div>
    <div class="vm-hint-field">
      <Transition name="fade" mode="out-in">
        <span v-if="hint" class="vm-hint-message">
          {{ hint }}
        </span>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss">
$vm-checkbox-size: 18px;
$vm-checkbox-touch-size: 48px;

.vm-checkbox-field {
  display: flex;
  flex-direction: column;
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
      color: #856262;
    }
    .vm-hint-counter {
      margin-left: auto;
      margin-top: 2px;
      color: #703a3a;
    }
    .vm-hint-error {
      color: #d70000;
    }

    .vm-counter-limit {
      color: #d23232;
      font-weight: 600;
    }
  }
}

.vm-checkbox {
  width: auto;
  margin: 16px 16px 0 0;
  display: inline-flex;
  position: relative;

  &:not(:has(input:disabled)) {
    cursor: pointer;

    .vm-checkbox-label {
      cursor: pointer;
    }
  }
  .vm-checkbox-container {
    width: $vm-checkbox-size;
    min-width: $vm-checkbox-size;
    height: $vm-checkbox-size;
    position: relative;
    border-radius: 2px;
    border: 2px solid gray;
    transition: 400ms cubic-bezier(0.25, 0.8, 0.25, 1);

    &:focus {
      outline: none;
    }

    &:before,
    &:after {
      position: absolute;
      transition: 400ms cubic-bezier(0.55, 0, 0.55, 0.2);
      content: ' ';
    }
    &:before {
      width: $vm-checkbox-touch-size;
      height: $vm-checkbox-touch-size;
      top: 50%;
      left: 50%;
      z-index: 1;
      border: 50%;
      transform: translate(-50%, -50%);
    }
    &:after {
      width: 6px;
      height: 13px;
      top: 0;
      left: 5px;
      z-index: 12;
      border: 2px solid white;
      border-top: 0;
      border-left: 0;
      opacity: 0;
      transform: rotate(45deg) scale3d(0.15, 0.15, 1);
    }
    input {
      position: relative;
      left: -999em;
    }
  }
  .vm-checkbox-label {
    height: $vm-checkbox-size;
    padding-left: 16px;
    font-size: 14px;
    position: relative;
    align-self: center;
    line-height: $vm-checkbox-size;
  }

  &.vm-required {
    label:after {
      position: absolute;
      top: 2px;
      right: 0;
      transform: translateX(calc(100% + 2px));
      content: '*';
      line-height: 1em;
      vertical-align: top;
    }
  }

  &.vm-indeterminate {
    .vm-checkbox-container {
      &:after {
        width: 12px;
        height: 2px;
        top: 50%;
        left: 50%;
        z-index: 7;
        border-style: solid;
        border-width: 0 0 2px;
        opacity: 0;
        transform: translate(-50%, -50%) !important;
      }
    }
  }
  &.vm-checked {
    .vm-checkbox-container {
      &:after {
        opacity: 1;
        transform: rotate(45deg) scale3d(1, 1, 1);
        transition: 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      background-color: green;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
