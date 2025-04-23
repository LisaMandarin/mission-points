import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  type User,
} from "firebase/auth";
import { setDoc, getDoc, updateDoc, doc,  } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const useUserStore = defineStore("user", () => {
  const user = ref<null | User>(null);   // Firebase auth user
  const userData = ref<null | Record<string, any>>(null);   // Firestore profile
  
  /* ****************************
  Save basic profile to Firebase
  **************************** */
  const saveUserProfile = async (firebaseUser: User) => {  
    const profile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      createdAt: new Date(),
    }
    await setDoc(doc(db, "users", firebaseUser.uid), profile, {merge: true});

    userData.value = profile;
  };

  /* ****************************
  Fetch Firestore user profile
  **************************** */
  const fetchUserProfile = async (firebaseUser: User) => {
    const profileDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    if (profileDoc.exists()) {
      userData.value = profileDoc.data();
    } else {
      userData.value = null;
    }
  };


  /* ****************************
  Register with Email/Password
  **************************** */
  async function register(email: string, password: string) {
    const {user: firebaseUser} = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    user.value = firebaseUser;

    await saveUserProfile(firebaseUser);
  }

   /* ****************************
  Register/Login with Google or Facebook
  **************************** */
  async function oauthLogin(provider: string, isRegister: boolean) {
    const selectedProvider = provider === "google" ? googleProvider : facebookProvider;
    const {user: firebaseUser} = await signInWithPopup(auth, selectedProvider);
    user.value = firebaseUser

    if (isRegister) {
      await saveUserProfile(firebaseUser)
    } else {
      await fetchUserProfile(firebaseUser);
    }
  }

  /* ****************************
  Login with Email/Password
  **************************** */
  async function login(email: string, password: string) {
    const {user: firebaseUser} = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    user.value = firebaseUser;
    await fetchUserProfile(firebaseUser);
  }

  /* ****************************
  Logout
  **************************** */
  async function logout() {
    await signOut(auth);
    user.value = null;
    userData.value = null;
  }

  /* ****************************
  Update Firestore profile fields
  **************************** */
  async function updateUser(updates: Partial<Record<string, any>>) {
    if (!user.value) return;

    await updateDoc(doc(db, "users", user.value.uid), updates);
    await fetchUserProfile(user.value);
  }

  /* ****************************
  Create a Home document
  **************************** */
  async function setHome(homeID: string) {
    if (!user.value) return;
    await setDoc(doc(db, "homes", homeID), {
      uid: homeID,
      createdAt: new Date(),
      ownerID: user.value.uid,
    });
    await fetchUserProfile(user.value);
  }

  return {
    user,
    userData,
    saveUserProfile,
    fetchUserProfile,
    register,
    oauthLogin,
    login,
    logout,
    updateUser,
    setHome,
  };
});
