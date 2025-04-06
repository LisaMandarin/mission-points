<script setup lang="ts">
import { AiFillEye, AiFillEyeInvisible } from "vue-icons-plus/ai";
import { ref, watch } from "vue";

const props = defineProps<{ password: string }>();
const emit = defineEmits<{
  (e: "update:password", value: string): void;
}>();
const isVisible = ref(false);
const password = ref(props.password);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

watch(password, (newValue) => {
  emit("update:password", newValue);
});
</script>

<template>
  <input
    :type="isVisible ? 'text' : 'password'"
    placeholder="Confirm your password"
    v-model="password"
    class="w-full"
  />
  <AiFillEye
    v-if="isVisible"
    class="absolute top-0 right-2 translate-y-1/3 cursor-pointer"
    @click="toggleVisibility"
  />
  <AiFillEyeInvisible
    v-if="!isVisible"
    class="absolute top-0 right-2 translate-y-1/3 cursor-pointer"
    @click="toggleVisibility"
  />
</template>
