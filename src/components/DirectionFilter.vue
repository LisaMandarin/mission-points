<script setup lang="ts">
import { ref, watch } from 'vue';
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>()
const isIncrement = ref(true);

watch(isIncrement, (newVal) => {
    emit('update:modelValue', newVal)
})
</script>
<template>
    <select v-model="isIncrement" class="px-2 py-1 border border-blue rounded-md">
        <option :value="true">increment</option>
        <option :value="false">decrement</option>
    </select>
</template>