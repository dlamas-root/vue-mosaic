<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import VmIcon from '../VmIcon/VmIcon.vue'

const model = defineModel<String>()

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
</script>

<template>
  <div class="vm-field">
    <!-- rules, prependIcon, prefix -->
    <div class="vm-input-field">
      <span class="vm-input-prefix" v-if="prefix">
        {{ prefix }}
      </span>
      <VmIcon v-if="prependIcon" :name="prependIcon"  :color="iconColor"/>
      <input
        v-model="model"
        :id
        :name
        :disabled
        :readonly
        :required
        :type="inputType"
        :maxlength="maxLength"
        :class="prependIcon ? 'pl-5' : ''"
      />
      <label :class="{ 'vm-label-focused': prefix }" :style="prependIcon ? 'padding-left: 1.5rem;' : ''">
        <slot name="label">
          {{ label }}
        </slot>
      </label>
      <span class="vm-input-suffix" v-if="suffix">
        {{ suffix }}
      </span>
      <slot name="append">
        <VmIcon v-if="appendIcon" :name="appendIcon"  :color="iconColor"/>
        <span
          v-else-if="type === 'password'"
          class="vm-icon-field"
          @click="showPassword = !showPassword"
        >
        <Transition name="zoom-fade-in" mode="out-in">
          <VmIcon v-if="showPassword" name="visibility" size="20" filled :color="iconColor" />
          <VmIcon v-else name="visibility_off" size="20" filled :color="iconColor" />
        </Transition>
        </span>
      </slot>
    </div>
    <div class="vm-hint-field">
      <Transition name="fade" mode="out-in">
        <span v-if="hint" class="vm-hint-message">{{ hint }}</span>
        <span v-else class="vm-hint-message"></span>
      </Transition>
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
      color: #856262;
    }
    .vm-hint-counter {
      margin-left: 10px;
      margin-top: 2px;
      color: #703a3a;
    }
  }

  /* we will explain what these classes do next! */
  .fade-in-top{
    animation: FadeInTop 0.6s ease-in-out 0s 1 normal both;
  }

  @keyframes FadeInTop {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
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

  .zoom-fade-in-enter-active,
  .zoom-fade-in-leave-active {
    transition: all 0.3s ease-in-out;
    scale: 1.1;
  }

  .zoom-fade-in-enter-from,
  .zoom-fade-in-leave-to {
    opacity: 0;
    scale: 1;
  }
}
</style>
