import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Feed from "../views/Feed.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const routes = [
    { path: '/', name: "Home", component: Home},
    { path: '/feed', name: 'Feed', component: Feed, meta: {requiresAuth: true} },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, _, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (requiresAuth && !user) {
            return next('/login');
        } else {
            return next();
        }
    });
})
export default router