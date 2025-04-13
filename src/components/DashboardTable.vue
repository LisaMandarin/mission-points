<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { BsHouse } from 'vue-icons-plus/bs';
import { useUserStore } from '../stores/user';
import { db } from '../firebase';
import { query, collection, where, getDocs} from 'firebase/firestore';

const userStore = useUserStore();
const userData = computed(() => userStore.userData);
const familyMembers = ref<any[]>([]);
const filteredMembers = ref<any[]>([]);

watchEffect(async() => {
    const homeCode = userData.value?.homeCode;
    if (!homeCode) return;

    const userRef = collection(db, "users");
    const q = query(userRef, where("homeCode", "==", homeCode));
    const snapshot = await getDocs(q);
    familyMembers.value = snapshot.docs.map((doc) => doc.data());
})

watchEffect(() => {
    if (familyMembers.value && userData.value) {
        filteredMembers.value = familyMembers.value.filter((member) => {
            return member.uid !== userData.value?.uid;
        })
    }
})
</script>
<template>
    <table class="w-[300px] md:w-[600px] border-2 border-blue">
            <thead class="bg-blue text-white">
                <tr>
                    <th class="p-2 flex justify-center items-center"><BsHouse />{{ userData?.homeCode ? userData.homeCode : '' }}</th>
                    <th class="p-2">Name</th>
                    <th class="p-2">Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="userData">
                    <td class="text-center p-2">Me</td>
                    <td v-if="userData.name" class="text-center p-2">{{ userData.name }}</td>
                    <td v-else class="text-center p-2">N/A</td>
                    <td v-if="userData.role" class="text-center p-2">{{ userData.role }}</td>
                    <td v-else class="text-center p-2">N/A</td>
                </tr>
                <tr v-else>
                    <td>Me</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                </tr>
                <tr v-for="member in filteredMembers">
                    <td class="text-center p-2">Other</td>
                    <td class="text-center p-2">{{ member.name }}</td>
                    <td class="text-center p-2">{{ member.role }}</td>
                </tr>
            </tbody>
        </table>
</template>