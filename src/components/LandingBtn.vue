<script setup lang="ts">
defineProps({
  name: String,
  link: {
    type: String,
    required: true,
    default: "/",
  },
});
</script>
<template>
  <router-link :to="link">
    <div
      class="w-[300px] h-[300px] border-2 border-orange-200 rounded-2xl text-4xl bg-orange-300 flex justify-center items-center font-title hover:shadow-2xl"
    >
      {{ name }}
    </div>
  </router-link>
</template>
