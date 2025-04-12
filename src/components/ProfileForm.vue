<script setup lang="ts">
import { message } from "ant-design-vue";
import { useUserStore } from "../stores/user";
import { ref } from "vue";

const userStore = useUserStore();
const userData = userStore.userData;
const name = ref(userData?.name);
const role = ref(userData?.role);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
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
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error(String(error));
      }
    }
  }
};
</script>

<template>
    <form
      class="w-[300px] md:w-[700px] mx-auto space-y-4 md:space-y-12 text-2xl md:text-4xl"
      @submit="handleSubmit"
    >
      <p v-if="userData">{{ userData.email }}</p>
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