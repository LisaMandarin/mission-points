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
        @click="register"
      >
        Register
      </button>
      <p class="text-center">or</p>
      <button
        class="border p-2 rounded-lg text-center cursor-pointer w-full"
        @click="handleGoogleSignIn"
      >
        Sign in with Google
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useUIStore } from "../stores/ui";
import PasswordInput from "../components/PasswordInput.vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const ui = useUIStore();
const errorMsg = ref("");
const router = useRouter();

const register = () => {
  ui.isLoading = true;
  errorMsg.value = "";
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Passwords do not match";
    ui.isLoading = false;
    return;
  }
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      router.push("/feed");
    })
    .catch((error) => {
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
        default:
          errorMsg.value = "An error occurred. Please try again.";
          break;
      }
    })
    .finally(() => {
      ui.isLoading = false;
    });
};
const handleGoogleSignIn = () => {
  console.log("Sign in with Google");
};
</script>
