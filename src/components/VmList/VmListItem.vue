<script setup lang="ts">
</script>

<template>
  <div class="vm-list-item">
    <div>
      <slot name="prepend"/>
    </div>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss">
.vm-list-item {
  padding: 10px 10px;
  background: lightgrey;
}
</style>