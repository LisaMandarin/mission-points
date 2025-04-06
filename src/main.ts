import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBh095l4Rw4d3uFhXbntvwL3it_jDsf_4",
  authDomain: "mission-points.firebaseapp.com",
  projectId: "mission-points",
  storageBucket: "mission-points.firebasestorage.app",
  messagingSenderId: "903490248321",
  appId: "1:903490248321:web:c4642b3f0af212e0b5b780"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).use(createPinia()).mount('#app')
