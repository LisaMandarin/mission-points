<script setup lang="ts">
import { message } from "ant-design-vue";
import { useUserStore } from "../stores/user";
import { useUIStore } from "../stores/ui";
import { useRouter } from "vue-router";
import { computed, ref, watchEffect } from "vue";
import type { UserDataType } from "../types";

const router = useRouter();
const ui = useUIStore();
const userStore = useUserStore();
const userData = computed<UserDataType | null>(
  () => userStore.userData as UserDataType | null
);
const name = ref('');
const role = ref('');

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  ui.isLoading = true;
  if (name.value === "") {
    message.error("Name can't be empty");
  }
  if (role.value === "") {
    message.error("Role can't be empty");
  }
  if (name.value && role.value) {
    try {
      await userStore.updateUser(name.value, role.value);
      message.success("User profile updated");
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error(String(error));
      }
    } finally {
      ui.isLoading = false;
    }
  }
};
watchEffect(() => {
  if (userData.value) {
    name.value = userData.value.name;
    role.value = userData.value.role;
  }
})
</script>

<template>
  <form
    class="w-[300px] md:w-[700px] mx-auto space-y-4 md:space-y-12 text-2xl md:text-4xl"
    @submit="handleSubmit"
  >
    <div class="flex flex-col md:gap-2">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="name"
        class="border border-blue px-4 md:px-8 py-2 md:py-4 rounded-lg"
      />
    </div>
    <div class="flex flex-col">
      <label for="role">Role</label>
      <select
        name="role"
        id="role"
        v-model="role"
        class="border border-blue px-4 md:px-8 py-2 md:py-4 rounded-lg cursor-pointer"
      >
        <option value="">Choose</option>
        <option value="parent">Parent</option>
        <option value="child">Child</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div class="text-center">
      <button
        type="submit"
        class="border px-4 md:px-8 py-2 md:py-4 rounded-lg bg-blue text-white cursor-pointer"
      >
        Update Profile
      </button>
    </div>
  </form>
</template>
