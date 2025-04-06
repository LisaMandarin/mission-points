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
    <div class="w-[110px] h-[55px]">
      <div
        class="w-[100px] h-[50px] border-2 border-black rounded-2xl text-xl flex justify-center items-center font-body bg-beige text-black font-bold transition-transform duration-300 hover:scale-110"
      >
        {{ name }}
      </div>
    </div>
  </router-link>
</template>
