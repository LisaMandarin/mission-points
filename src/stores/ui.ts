import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
    const isLoading = ref(false)
    const isLoggedIn = ref<boolean>()
    return { isLoading, isLoggedIn };
})