import { createRouter, createWebHistory } from "vue-router";
import Landing from "@/pages/Landing.vue";
import Features from "@/pages/Features.vue";
import Pricing from "@/pages/Pricing.vue";
import Contact from "@/pages/Contact.vue";
import Tasks from "@/pages/Tasks.vue";
import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Register from "@/pages/Register.vue";
import Logout from "@/pages/Logout.vue";
import TaskDetail from "@/pages/TaskDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Landing,
  },
  {
    path: "/features",
    name: "Features",
    component: Features,
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: Pricing,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
  },
  {
    path: "/task-detail/:id",
    name: "TaskDetail",
    component: TaskDetail,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash };
    return { top: 0 };
  },
});

// 🔐 GLOBAL AUTH GUARD (FIXED)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // ✅ FIX

  // 🔒 protected route
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // 🚫 guest route (login/register)
  if (to.meta.guest && token) {
    return next("/dashboard");
  }

  next();
});

export default router;
