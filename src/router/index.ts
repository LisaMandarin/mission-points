import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import { dashboardRoutes } from "./dashboard-routes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: dashboardRoutes,
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe();
    if (requiresAuth && !user) {
      return next("/login");
    } else {
      return next();
    }
  });
});
export default router;
