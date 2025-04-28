<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const selectedFilter = ref("");

watch(selectedFilter, (newVal) => {
  emit('update:modelValue', newVal);
})
</script>
<template>
  <select class="cursor-pointer px-2 py-1 border border-blue rounded-md" v-model="selectedFilter" >
    <option value="">filtered by</option>
    <option value="time">time</option>
    <option value="name">Person Name</option>
    <option value="status">status</option>
  </select>
</template>
