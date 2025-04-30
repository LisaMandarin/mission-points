<script setup lang="ts">
import { nextTick, ref } from "vue";
import { MdOutlineAddCircleOutline } from "vue-icons-plus/md";
import { RiDeleteBin5Fill } from "vue-icons-plus/ri";
import { BiEdit } from "vue-icons-plus/bi";
import { message } from "ant-design-vue";
import { useUIStore } from "../stores/ui";
import { useHomeStore } from "../stores/home";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const newPrize = ref<string>("");
const newPoints = ref<number>();
const isEditable = ref(false);
const editableRef = ref<Record<string, HTMLElement | null>>({});
const ui = useUIStore();
const homeStore = useHomeStore();

const handleAddPrize = async (e: Event) => {
  e.preventDefault();
  ui.isLoading = true;
  try {
    if (!newPrize.value || !newPoints.value) {
      throw new Error(
        "You have to add prize name and cost value before adding it."
      );
    }
    const homeID = homeStore.homeID;
    if (!homeID) {
      throw new Error(
        "What's your home ID? You can't add a prize without a home ID."
      );
    }
    const docRef = collection(db, "homes", homeID, "prizes");
    await addDoc(docRef, {
      name: newPrize.value,
      cost: newPoints.value,
      createdAt: new Date(),
    });
    newPrize.value = "";
    newPoints.value = 0;
  } catch (error) {
    console.error("Failed to add a prize: ", error);
    if (error instanceof Error) {
      message.error(error.message);
    } else {
      message.error("Unknown error");
    }
  } finally {
    ui.isLoading = false;
  }
};

const handleDeletePrize = () => {
  console.log("Delete prize");
};

const handleIsEditable = async (prizeID: string) => {
  isEditable.value = !isEditable.value;
  if (isEditable.value) {
    await nextTick();
    const targetElement = editableRef.value[prizeID];
    if (targetElement) {
      targetElement.focus();
    }
  }
};

const updateCost = async (prizeID: string) => {
  const homeID = homeStore.homeID;
  const targetElement = editableRef.value[prizeID];

  if (!targetElement) return;

  const newCost = parseInt(targetElement.innerText.trim());

  if (isNaN(newCost)) {
    message.error("Please enter a valid number");
    return;
  }

  try {
    const prizeRef = doc(db, "homes", homeID, "prizes", prizeID);
    await updateDoc(prizeRef, {
      cost: newCost,
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <table class="w-[300px] md:w-[600px] border-2 border-blue">
    <thead class="bg-blue text-white">
      <tr>
        <th class="p-2">Prize</th>
        <th class="p-2">Cost</th>
        <th class="p-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-if="homeStore.prizes.length > 0"
        v-for="prize in homeStore.prizes"
        :key="prize.id"
      >
        <td class="p-2 text-center">{{ prize.name }}</td>
        <td
          class="p-2 text-center outline-none focus:ring rounded"
          :contenteditable="isEditable ? 'true' : 'false'"
          :ref="(element) => (editableRef[prize.id] = element as HTMLElement)"
          @blur="() => updateCost(prize.id)"
        >
          {{ prize.cost }}
        </td>
        <td
          class="p-2 text-red-500 cursor-pointer flex justify-center items-center gap-2"
        >
          <a-popconfirm
            title="Are you sure to delete this prize?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleDeletePrize"
          >
            <RiDeleteBin5Fill class="inline-block" />
          </a-popconfirm>
          <BiEdit
            class="inline-block"
            @click="() => handleIsEditable(prize.id)"
          />
        </td>
      </tr>
      <tr v-else>
        <td colspan="3" class="text-center">You haven't had any prizes yet.</td>
      </tr>
    </tbody>
  </table>
  <div class="collapse w-[300px] md:w-[600px] mt-4 md:text-2xl">
    <input type="checkbox" />
    <p class="bg-blue text-white collapse-title text-center">
      Add Prize<MdOutlineAddCircleOutline
        class="inline-block h-4 md:h-6 w-4 md:w-6 align-middle mx-2"
      />
    </p>
    <form
      @submit="handleAddPrize"
      class="collapse-content flex flex-col gap-4 my-4"
    >
      <div class="flex gap-4">
        <label class="w-1/5">Prize</label>
        <input
          type="text"
          v-model="newPrize"
          class="flex-grow px-2 border border-blue rounded"
        />
      </div>
      <div class="flex gap-4">
        <label class="w-1/5">Cost</label>
        <input
          type="number"
          v-model="newPoints"
          class="flex-grow px-2 border border-blue rounded"
        />
      </div>
      <button
        type="submit"
        class="cursor-pointer w-fit bg-blue text-white px-4 py-2 rounded-lg ml-auto"
      >
        Add
      </button>
    </form>
  </div>
</template>
