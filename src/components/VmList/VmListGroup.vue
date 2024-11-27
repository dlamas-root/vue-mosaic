<script setup lang="ts">
import { type Ref, ref } from 'vue';
import VmIcon from '../VmIcon/VmIcon.vue';

const opened: Ref<boolean> = ref(false);
</script>

<template>
  <div class="vm-list-group">
    <slot name="prepend"/>
    <div class="content">
      Algo
    </div>
    <VmIcon class="icon" name="arrow_drop_down"/>
  </div>
  <div v-show="opened">
    <slot/>
  </div>
</template>

<style lang="scss">
.vm-list-group {
  display: flex;
  flex-direction: row;
  padding: 10px 10px;

  .content {
    margin-right: auto;
  }

  .icon {
    justify-self: end;
  }
}
</style>