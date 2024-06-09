const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AboutPage.vue") }],
  },

  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/HomePage.vue") }],
  },
  {
    path: "/register",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RegistrationPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
