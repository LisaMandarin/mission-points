import DashboardView from "../views/DashboardView.vue";
import DashboardProfile from "../views/DashboardProfile.vue";
import DashboardPoints from "../views/DashboardPoints.vue";
import DashboardPrize from "../views/DashboardPrize.vue";

export const dashboardRoutes = [
  {
    path: "",
    name: "Overview",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "profile",
    name: "Profile",
    component: DashboardProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "points",
    name: "Points",
    component: DashboardPoints,
    meta: { requiresAuth: true },
  },
  {
    path: "prizes",
    name: "Prizes",
    component: DashboardPrize,
    meta: { requiresAuth: true },
  }
];
