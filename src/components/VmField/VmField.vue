<script setup lang="ts">
import VmIcon from '../VmIcon/VmIcon.vue'

defineOptions({
  name: 'VmField'
})

defineProps({
  appendIcon: String,
  prependIcon: String,
  counter: Boolean,
  counterActual: Number,
  counterMax: [Number, String],
  hint: String,
  error: String,
  label: String,
  loading: Boolean,
  prefix: String,
  suffix: String,
  iconColor: String
})
</script>

<template>
  <div class="vm-field">
    <div class="vm-input-field">
      <slot name="prepend">
        <VmIcon class="vm-input-prefix" v-if="prependIcon" :name="prependIcon" :color="iconColor" />
      </slot>
      <span v-if="prefix" class="vm-input-prefix">
        {{ prefix }}
      </span>
      <slot />
      <label>
        <slot name="label">
          {{ label }}
        </slot>
      </label>
      <span class="vm-input-suffix" v-if="suffix">
        {{ suffix }}
      </span>
      <slot name="append">
        <VmIcon v-if="appendIcon" :name="appendIcon" :color="iconColor" />
      </slot>
    </div>
    <div class="vm-hint-field">
      <Transition name="fade" mode="out-in">
        <span v-if="hint || error" class="vm-hint-message" :class="{ 'vm-hint-error': error }">
          {{ error || hint }}
        </span>
      </Transition>
      <div
        v-if="counter"
        class="vm-hint-counter"
        :class="counterActual == counterMax ? 'vm-counter-limit' : ''"
      >
        {{ counterActual }}<span v-if="counterMax">/{{ counterMax }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.vm-field {
  .vm-input-field {
    position: relative;
    margin: 15px 0 0 0;
    transition: 0.15s ease;
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid gainsboro;

    &:has(span.vm-input-prefix) {
      &:has(> input:focus, input:valid) {
        padding-left: 0;
      }
      &:not(:has(> input:focus, input:valid)) {
        label {
          padding-left: 1.5rem;
        }
      }
    }

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

    &:has(> input:focus, input:valid, select:focus, select:valid) {
      border-bottom: 2px solid #ac3f3f;
    }

    input,
    select {
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

  .vm-input-required {
    border-bottom: 2.5px solid #d70000;
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

  /* we will explain what these classes do next! */
  .fade-in-top {
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
