import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
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
import { setDoc, getDoc, updateDoc, doc } from "firebase/firestore";

export const getUser = async (
  user: User,
) => {
  const result = await getDoc(doc(db, "users", user.uid));
  if (result.exists()) {
    return result.data();
  }
  return null;
};

export const useUserStore = defineStore("user", () => {
  const user = ref<null | User>(null);
  const userData = ref<null | Record<string, any>>(null);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const setUser = async (
    user: User,
    userData: Ref<null | Record<string, any>>
  ) => {
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

  async function register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    user.value = userCredential.user;

    await setUser(user.value, userData);
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
      await setUser(user.value, userData);
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

    userData.value = await getUser(user.value);
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
      await getUser(user.value);
    }
  }

  async function logout() {
    await signOut(auth);
    user.value = null;
    userData.value = null;
  }

  async function updateUser(name: string, role: string) {
    if (user.value) {
      await updateDoc(doc(db, "users", user.value.uid), {
        name,
        role,
      });
      await getUser(user.value)
    }
  }

  return {
    user,
    userData,
    register,
    oauthRegister,
    login,
    oauthLogin,
    logout,
    updateUser,
  };
});
