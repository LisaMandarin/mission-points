<script setup lang="ts">
    import { AiFillGoogleCircle } from 'vue-icons-plus/ai';
    import { AiFillFacebook } from 'vue-icons-plus/ai';
</script>
<template>
    <div class="h-screen flex flex-col gap-4 justify-center items-center">
        <div class="text-2xl font-body border w-72 rounded-lg px-2">
            <AiFillGoogleCircle class="w-8 h-8 inline"/>
            Log in via Google</div>
        <div class="text-2xl font-body border w-72 rounded-lg px-2">
            <AiFillFacebook class="w-8 h-8 inline"/>
            Log in via Facebook</div>
    </div>
</template>