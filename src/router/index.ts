import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Feed from "../views/Feed.vue";

export const routes = [
    { path: '/', name: "Home", component: Home},
    { path: '/feed', name: 'Feed', component: Feed },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router