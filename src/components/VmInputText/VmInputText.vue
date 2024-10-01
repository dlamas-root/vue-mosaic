<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'

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
      <slot name="prepend"></slot>
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
      <label>
        <slot name="label">
          {{ label }}
        </slot>
      </label>
      <slot name="append">
        <span v-if="appendIcon"></span>
        <span
          v-else-if="type === 'password'"
          class="vm-icon-field"
          @click="showPassword = !showPassword"
        >
          <svg
            v-show="!showPassword"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            />
          </svg>
          <svg
            v-show="showPassword"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none" />
            <path
              d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
            />
          </svg>
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
      top: 50%;
      left: 2px;
      transform: translateY(-50%);
      color: #000;
      font-size: 16px;
      pointer-events: none;
      transition: 0.15s ease;
    }

    &:has(> input:focus, input:valid) {
      border-bottom: 2px solid red;
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
          font-size: 0.8rem;
          top: 10px;
          transform: translateY(-120%);
        }
      }

      &:required ~ label::after {
        content: ' *';
      }
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
    }
  }
}
</style>
