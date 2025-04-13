<script setup lang="ts">
import { message } from "ant-design-vue";
import { useUserStore } from "../stores/user";
import { useUIStore } from "../stores/ui";
import { useRouter } from "vue-router";
import { computed, ref, watchEffect } from "vue";
import { customAlphabet } from "nanoid";

const router = useRouter();
const ui = useUIStore();
const userStore = useUserStore();
const userData = computed(() => userStore.userData);
const nanoid = customAlphabet('123456789abcderfghijklmnpqrstuvwxyz', 4) // generate 4-character home code

const name = ref("");
const role = ref("");
const homeAction = ref<"create" | "join" | "">("");
const homeCode = ref(userData.value?.homeCode);
const newHomeCode = nanoid();
const errorMsg = ref("");

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  ui.isLoading = true;

  try {
    if (name.value === "") {
      throw new Error("Name can't be empty");
    }
    if (role.value === "") {
      throw new Error("Please choose a role");
    }
    
    let homeCodeToUse = "";
    if (homeAction.value === "create") {
      homeCodeToUse = newHomeCode;
      if (userData.value) {
        await userStore.setHome(homeCodeToUse)
      } else {
        throw new Error("Error during fetching user data.  Please try again")
      }
    } else if (homeAction.value === "join") {
      homeCodeToUse = homeCode.value
    }
    if (homeCodeToUse ==="") {
      throw new Error("Please choose home setup")
    }
    await userStore.updateUser(name.value, role.value, homeCodeToUse);
    message.success("User profile updated");
    router.push("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      errorMsg.value = error.message;
    } else {
      errorMsg.value = String(error);
    }
  } finally {
    ui.isLoading = false;
  }
};
watchEffect(() => {
  if (userData.value) {
    name.value = userData.value.name ?? "";
    role.value = userData.value.role ?? "";
  }
});
</script>

<template>
  <form
    class="w-[300px] md:w-[700px] mx-auto space-y-4 md:space-y-12 text-2xl md:text-4xl"
    @submit="handleSubmit"
  >
    <div v-if="errorMsg" class="text-red-600 text-center">{{ errorMsg }}</div>
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
    <div class="flex flex-col">
      <label>Home Setup</label>
      <div class="flex flex-col">
        <label class="cursor-pointer">
          <input type="radio" value="create" v-model="homeAction"/>
          Create a home
        </label>
        <label class="cursor-pointer">
          <input type="radio" value="join" v-model="homeAction"/>
          Join a home
        </label>
        <div v-if="homeAction === 'create'" class="mt-4 text-lg md:text-2xl font-goofy">
          <span>Your invitation code:</span>
          <span class="text-blue pl-2">{{ newHomeCode }}</span>
        </div>
        <div v-else-if="homeAction === 'join'" class="mt-4 text-lg md:text-2xl font-goofy">
          <input type="text" v-model="homeCode" placeholder="Enter home code" class="border border-blue px-4 md:px-8 py-2 md:py-4 rounded-lg"/>
        </div>
      </div>
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
