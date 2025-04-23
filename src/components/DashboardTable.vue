<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import { BsHouse } from 'vue-icons-plus/bs';
import { useUserStore } from '../stores/user';
import { db } from '../firebase';
import { query, collection, where, getDocs} from 'firebase/firestore';

const userStore = useUserStore();
const userData = computed(() => userStore.userData)
const familyMembers = ref<Record<string, any>[]>([]);
const filteredMembers = ref<Record<string, any>[]>([]);

watchEffect(async() => {
    if (!userData.value) return
    const homeID = userData.value.homeID;
    if (!homeID) return;

    const userRef = collection(db, "users");
    const q = query(userRef, where("homeID", "==", homeID));  // query firestore users who have the corresponding homeID
    const snapshot = await getDocs(q);
    familyMembers.value = snapshot.docs.map((doc) => doc.data());
})

watchEffect(() => {
    if (familyMembers.value && userData.value) {
        filteredMembers.value = familyMembers.value.filter((member) => {
            return member.uid !== userData.value?.uid;   // family members that exclude the user itself
        })
    }
})
</script>
<template>
    <table class="w-[300px] md:w-[600px] border-2 border-blue">
            <thead class="bg-blue text-white">
                <tr>
                    <th class="p-2 flex justify-center items-center"><BsHouse />{{ userData?.homeID ? userData.homeID : '' }}</th>
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