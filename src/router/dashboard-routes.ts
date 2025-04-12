import DashboardView from "../views/DashboardView.vue";
import DashboardProfile from "../views/DashboardProfile.vue";
import DashboardPoints from "../views/DashboardPoints.vue";

export const dashboardRoutes = [
  {
    path: "",
    name: "Overview",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "profile",
    name: "Edit Profile",
    component: DashboardProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "points",
    name: "Manage Points",
    component: DashboardPoints,
    meta: { requiresAuth: true },
  },
];
