import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { computed, ref, watchEffect } from "vue";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import type { MissionType, PointsApplicationType } from "../types";

export const useHomeStore = defineStore("home", () => {
  const userStore = useUserStore();
  const homeID = computed(() => userStore.userData?.homeID || "");
  const currentUserID = computed(() => userStore.userData?.uid || "");

  const familyMembers = ref<Record<string, any>[]>([]);
  const filteredMembers = computed(() =>
    familyMembers.value.filter((member) => member.uid !== currentUserID.value)
  );
  const familyMap = computed(() => 
    familyMembers.value.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {})
    )

  const missions = ref<MissionType[]>([]);
  const applications = ref<PointsApplicationType[]>([]);
  const applicationsByUser = computed(() => 
    applications.value.filter((application) => application.appliedBy === userStore.userData?.uid)
  )
  const missionMap = ref<Record<string, MissionType>>({});

  const fetchFamilyMembers = async () => {
    if (!homeID.value) return;

    const userRef = collection(db, "users");
    const q = query(userRef, where("homeID", "==", homeID.value));
    const snapshot = await getDocs(q);
    familyMembers.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
  };

  const listenToMissions = () => {
    if (!homeID.value) return;

    const missionRef = collection(db, "homes", homeID.value, "missions");
    onSnapshot(missionRef, (query) => {
      missions.value = query.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        points: doc.data().points,
      }));
      missionMap.value = missions.value.reduce<Record<string, MissionType>>(
        (acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        },
        {}
      );
    });
  };

  const listenToApplications = () => {
    if (!homeID.value) return;

    const appRef = collection(db, "homes", homeID.value, "pointsApplication");
    onSnapshot(appRef, (query) => {
      applications.value = query.docs.map((doc) => {
        const data = doc.data() as Omit<PointsApplicationType, 'id'>;
        return {
          id: doc.id,
          ...data,
        };
      });
    });
  };

  watchEffect(() => {
    if (homeID.value) {
      fetchFamilyMembers();
      listenToMissions();
      listenToApplications();
    }
  });

  return { 
    homeID, 
    familyMembers, 
    filteredMembers, 
    familyMap,
    missions,
    missionMap,
    applications,
    applicationsByUser,
    fetchFamilyMembers,
    listenToMissions,
    listenToApplications
};
});
