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
        @click="login"
        class="border p-2 rounded-lg text-center cursor-pointer w-full"
      >
        Login
      </button>
      <p class="text-center">or</p>
      <button class="border p-2 rounded-lg text-center cursor-pointer w-full" @click="signInWithGoogle">
        Sign In With Google
      </button>
      <button class="border p-2 rounded-lg text-center cursor-pointer w-full" @click="signInWithFacebook">
        Sign In With Facebook
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useRouter } from "vue-router";
import { useUIStore } from "../stores/ui";
import PasswordInput from "../components/PasswordInput.vue";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();
const ui = useUIStore();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const login = () => {
  ui.isLoading = true;
  errorMsg.value = "";
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user) {
        router.push("/");
      }
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invalid email address";
          break;
        case "auth/user-not-found":
          errorMsg.value = "User not found";
          break;
        case "auth/wrong-password":
          errorMsg.value = "Wrong password";
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
const signInWithGoogle = () => {
  signInWithPopup(getAuth(), googleProvider)
    .then((result) => {
      const user = result.user;
      if (user) {
        router.push("/");
      }
    })
    .catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
};
const signInWithFacebook = () => {
  signInWithPopup(getAuth(), facebookProvider)
    .then((result) => {
      const user = result.user;
      if (user) {
        router.push("/");
      }
    })
    .catch((error) => {
      console.error("Error signing in with Facebook: ", error);
    })
}
</script>
