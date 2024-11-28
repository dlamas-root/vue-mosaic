<script setup lang="ts"></script>

<template>
  <div class="vm-option">
    <slot/>
  </div>
</template>

<style lang="scss">
.vm-option {
  padding: 5px 10px;

  &:hover {
    background-color: #efefef;
  }
}
</style>
