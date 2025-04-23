<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import PasswordInput from "../components/PasswordInput.vue";
import { useUIStore } from "../stores/ui";
import { useUserStore } from "../stores/user";
import { errorCodeMap } from "../utils/errorCode";
import { message } from "ant-design-vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const ui = useUIStore();
const userStore = useUserStore();
const router = useRouter();

const handleRegister = async () => {
  ui.isLoading = true;
  errorMsg.value = "";
  
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Passwords do not match";
    ui.isLoading = false;
    return;
  }

  try {
    await userStore.register(email.value, password.value);
    message.success("Welcome!  You've successfully signed in.");
    router.push("/");
  } catch (error: any) {
    errorMsg.value =
      errorCodeMap[error.code as keyof typeof errorCodeMap] ||
      "An error occurred. Please try again.";
  } finally {
    ui.isLoading = false;
  }
};
const handleOauthRegister = async (provider: string) => {
  
  ui.isLoading = true;
  errorMsg.value = "";

  try {
    await userStore.oauthLogin(provider, true);
    message.success("Welcome!  You've successfully signed in.");
    router.push("/");
  } catch (error: any) {
    errorMsg.value =
      errorCodeMap[error.code as keyof typeof errorCodeMap] ||
      "Something went wrong.  Please try again.";
  } finally {
    ui.isLoading = false;
  }
};
</script>

<template>
  <div class="relative w-[300px] mx-auto">
    <h1 class="text-center text-2xl font-bold font-goofy my-4">Registration</h1>

    <!-- Form -->
    <div class="space-y-4">
      <p v-if="errorMsg" class="text-red-600 text-center">{{ errorMsg }}</p>
      <p class="border p-2 rounded-lg">
        <input
          type="email"
          placeholder="Enter your email"
          v-model="email"
          class="w-full"
          autocomplete="email"
        />
      </p>
      <p class="relative border p-2 rounded-lg">
        <PasswordInput v-model:password="password" />
      </p>
      <p class="relative border p-2 rounded-lg">
        <PasswordInput v-model:password="confirmPassword" />
      </p>
      <button
        class="border p-2 rounded-lg text-center cursor-pointer w-full"
        @click="handleRegister"
      >
        Register
      </button>
      <p class="hover:underline text-blue-600">
        <router-link :to="'/login'">
          Have an account already? Login!
        </router-link>
      </p>
      <p class="text-center">or</p>
      <button
        class="border p-2 rounded-lg text-center cursor-pointer w-full"
        @click="handleOauthRegister('google')"
      >
        Sign in with Google
      </button>
      <button
        class="border p-2 rounded-lg text-center cursor-pointer w-full"
        @click="handleOauthRegister('facebook')"
      >
        Sign in with Facebook
      </button>
    </div>
  </div>
</template>
