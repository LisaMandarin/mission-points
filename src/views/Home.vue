<script setup lang="ts">
import LandingBtn from "../components/LandingBtn.vue";
</script>

<template>
  <div
    class="w-screen h-screen flex flex-col md:flex-row gap-8 justify-center items-center bg-gray-200"
  >
    <LandingBtn name="Login" link="/login" />
    <LandingBtn name="Register" link="/register" />
  </div>
</template>
