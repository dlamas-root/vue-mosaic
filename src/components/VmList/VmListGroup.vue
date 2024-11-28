<script setup lang="ts">
import { type Ref, ref } from 'vue';
import VmIcon from '../VmIcon/VmIcon.vue';

const opened: Ref<boolean> = ref(false);
</script>

<template>
  <div class="vm-list-group" @click="opened = !opened">
    <div v-if="$slots.prepend" class="prepend">
      <slot name="prepend"/>
    </div>
    <div class="content">
      Algo
    </div>
    <VmIcon class="icon" name="arrow_drop_down"/>
  </div>
  <div :key="'group_' + opened" v-show="opened">
    <slot/>
  </div>
</template>

<style lang="scss">
.vm-list-group {
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  align-items: center;

  .prepend {
    margin-right: 10px;
  }

  .content {
    margin-right: auto;
  }

  .icon {
    justify-self: end;
  }
}
</style>