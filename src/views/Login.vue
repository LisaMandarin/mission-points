<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUIStore } from "../stores/ui";
import PasswordInput from "../components/PasswordInput.vue";
import { useUserStore } from "../stores/user";
import { errorCodeMap } from "../utils/errorCode";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();
const ui = useUIStore();
const userStore = useUserStore();

const handleLogin = async () => {
  ui.isLoading = true;
  errorMsg.value = "";
  try {
    await userStore.login(email.value, password.value);
    router.push("/");
  } catch (error: any) {
    errorMsg.value = errorCodeMap[error.code as keyof typeof errorCodeMap] || "An error occurred.  Please try again."
  } finally {
    ui.isLoading = false;
  }
};

const handleOauthLogin = async (provider: string) => {
  ui.isLoading = true;
  errorMsg.value = "";
  try {
    await userStore.oauthLogin(provider);
    router.push("/");
  } catch (error) {
    if (error instanceof Error) {
      errorMsg.value = error.message
    } else {
      errorMsg.value = String(error)
    }
  } finally {
    ui.isLoading = false;
  }
};
</script>

<template>
  <div class="w-[300px] mx-auto space-y-4">
    <h1 class="text-center text-2xl font-bold font-goofy mt-4">Login</h1>

    <!-- Form -->
    <div class="space-y-4">
      <p v-if="errorMsg" class="text-red-600">{{ errorMsg }}</p>
      <p class="border p-2 rounded-lg">
        <input
          type="email"
          placeholder="Enter your email"
          v-model="email"
          autocomplete="email"
          class="w-full"
        />
      </p>
      <p class="relative border p-2 rounded-lg">
        <PasswordInput v-model:password="password" />
      </p>
      <button
        @click="handleLogin"
        class="border p-2 rounded-lg text-center cursor-pointer w-full"
      >
        Login
      </button>
      <p class="hover:underline text-blue-600">
        <router-link :to="'register'">
          Don't have an account yet? Regiseter first!
        </router-link>
      </p>
      <p class="text-center">or</p>
      <button
        class="border p-2 rounded-lg text-center cursor-pointer w-full"
        @click="handleOauthLogin('google')"
      >
        Sign In With Google
      </button>
      <button
        class="border p-2 rounded-lg text-center cursor-pointer w-full"
        @click="handleOauthLogin('facebook')"
      >
        Sign In With Facebook
      </button>
    </div>
  </div>
</template>
