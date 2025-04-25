<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';

const emit = defineEmits(["update:filter"]);
const selectedFilter = ref("");

watch(selectedFilter, (newVal) => {
  emit('update:filter', newVal);
})
</script>
<template>
  <select class="cursor-pointer px-2 py-1 border border-blue rounded-md" v-model="selectedFilter" >
    <option value="">filtered by</option>
    <option value="time">time</option>
    <option value="name">name</option>
    <option value="status">status</option>
  </select>
</template>
