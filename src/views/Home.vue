<script setup lang="ts">
import 'animate.css'
import LandingBtn from "../components/LandingBtn.vue";
</script>

<template>
  <div
    class="h-full flex flex-col justify-center items-center"
  >
  <div class="xl:h-[150px]">
    <h1 class="animate__animated animate__tada text-blue font-extrabold text-5xl xl:text-8xl font-title leading-24 text-center">Mission Points</h1>
  </div>  
    <div class="flex flex-row w-full justify-center gap-4 h-[60px]">
      <LandingBtn name="Login" link="/login" />
      <LandingBtn name="Register" link="/register" />
    </div>
  </div>
</template>
