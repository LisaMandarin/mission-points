import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBh095l4Rw4d3uFhXbntvwL3it_jDsf_4",
    authDomain: "mission-points.firebaseapp.com",
    projectId: "mission-points",
    storageBucket: "mission-points.firebasestorage.app",
    messagingSenderId: "903490248321",
    appId: "1:903490248321:web:c4642b3f0af212e0b5b780"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);