<template>
  <div class="relative w-[300px] mx-auto">
    <h1 class="text-center text-2xl font-bold font-goofy my-4">Registration</h1>

    <!-- Form -->
    <div class="space-y-4">
      <p v-if="errorMsg" class="text-red-600">{{ errorMsg }}</p>
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

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import PasswordInput from "../components/PasswordInput.vue";
import { useUIStore } from "../stores/ui";
import { useUserStore } from "../stores/user";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const ui = useUIStore();
const userStore = useUserStore();
const router = useRouter();

const handleRegister = async() => {
  ui.isLoading = true;
  errorMsg.value = "";

  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Passwords do not match";
    ui.isLoading = false;
    return;
  }

  try {
    await userStore.register(email.value, password.value)
    router.push('/')
  } catch (error: any) {
    switch (error.code) {
      case "auth/invalid-email":
        errorMsg.value = "Invalid email address";
        break;
      case "auth/missing-password":
        errorMsg.value = "Please enter a password";
        break;
      case "auth/weak-password":
        errorMsg.value = "Password should be at least 6 characters";
        break;
      case "auth/email-already-in-use":
        errorMsg.value = "This email is already registered"
        break;
      default:
        errorMsg.value = "An error occurred. Please try again.";
        break;
      }
  } finally {
    ui.isLoading = false;
  }

};
const handleOauthRegister = async(provider: string) => {
  ui.isLoading = true;
  errorMsg.value = "";

  try {
    await userStore.oauthRegister(provider)
    router.push('/')
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMsg.value = error.message
    } else {
      errorMsg.value = String(error);
    }
  } finally {
    ui.isLoading = false
  }
};

</script>
