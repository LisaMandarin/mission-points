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

export const useUserStore = defineStore("user", () => {
  const user = ref<null | User>(null);
  const userData = ref<null | Record<string, any>>(null);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const setUser = async (user: User) => {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
    });

    userData.value = {
      uid: user.uid,
      email: user.email,
    };
  };

  const getUser = async (user: User) => {
    const result = await getDoc(doc(db, "users", user.uid));
    if (result.exists()) {
      return result.data();
    }
    return null;
  };

  const updateUserData = async() => {
    if (user.value) {
      const foundUser = await getUser(user.value)
      if (foundUser) {
        userData.value = foundUser
      } else {
        userData.value = null
      }
    }
  }
  async function register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    user.value = userCredential.user;

    await setUser(user.value);
  }

  async function oauthRegister(provider: string) {
    let userCredential;
    if (provider === "google") {
      userCredential = await signInWithPopup(auth, googleProvider);
    } else if (provider === "facebook") {
      userCredential = await signInWithPopup(auth, facebookProvider);
    }
    if (userCredential?.user) {
      user.value = userCredential.user;
      await setUser(user.value);
    }
  }

  async function login(email: string, password: string) {
    user.value = null;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    user.value = userCredential.user;
    await updateUserData()
  }

  async function oauthLogin(provider: string) {
    let userCredential;
    if (provider === "google") {
      userCredential = await signInWithPopup(auth, googleProvider);
    } else if (provider === "facebook") {
      userCredential = await signInWithPopup(auth, facebookProvider);
    }
    if (userCredential?.user) {
      user.value = userCredential.user;
      await updateUserData();
    }
  }

  async function logout() {
    await signOut(auth);
    user.value = null;
    userData.value = null;
  }

  async function updateUser(name: string, role: string, homeCode: string) {
    if (user.value) {
      await updateDoc(doc(db, "users", user.value.uid), {
        name,
        role,
        homeCode,
      });
      await updateUserData();
    }
  }

  async function setHome(homeCodeToUse: string) {
    await setDoc(doc(db, "homes", homeCodeToUse), {
      uid: homeCodeToUse,
      createdAt: new Date(),
      ownerID: user.value?.uid,
    });
    await updateUserData()
  }

  return {
    user,
    userData,
    getUser,
    register,
    oauthRegister,
    login,
    oauthLogin,
    logout,
    updateUser,
    setHome,
  };
});
