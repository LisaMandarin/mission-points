<script setup lang="ts">
import { message } from "ant-design-vue";
import { useUserStore } from "../stores/user";
import { useUIStore } from "../stores/ui";
import { useRouter } from "vue-router";
import { computed, ref, watchEffect} from "vue";
import { customAlphabet } from "nanoid";

const router = useRouter();
const ui = useUIStore();
const userStore = useUserStore();
const userData = computed(() => userStore.userData)
const nanoid = customAlphabet('123456789abcderfghijklmnpqrstuvwxyz', 4) // generate 4-character home code

const name = ref("");
const role = ref("");
const homeAction = ref<"create" | "join" | "">("");
const homeID = ref("");
const newHomeID = nanoid();
const errorMsg = ref("");

watchEffect(() => {
  if (userData.value) {
    name.value = userData.value.name || ""
    role.value = userData.value.role || ""
    homeID.value = userData.value.homeID || ""
    homeAction.value = userData.value.homeID ? "join" : "create"
  }
});

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
    
    let finalHomeID;
    if (homeAction.value === "create") {
      finalHomeID = newHomeID;
      await userStore.setHome(finalHomeID)  
    } else if (homeAction.value === "join") {
      finalHomeID = homeID.value
    }
    if (homeID.value ==="") {
      throw new Error("Please choose home setup")
    }

    const updates = {
      name: name.value,
      role: role.value,
      homeID: finalHomeID
    }
    await userStore.updateUser(updates);
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
      <div class="flex flex-col border border-blue px-4 md:px-8 py-2 md:py-4 rounded-lg">
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
          <span class="text-blue pl-2">{{ newHomeID }}</span>
        </div>
        <div v-else-if="homeAction === 'join'" class="mt-4 text-lg md:text-2xl font-goofy">
          <input type="text" v-model="homeID" placeholder="Enter home ID" class="border border-blue px-4 md:px-8 py-2 md:py-4 rounded-lg"/>
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
