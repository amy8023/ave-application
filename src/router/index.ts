import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "",
        alias: "home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/home.vue"),
        meta: {
          title: "home",
          titleI18n: "marketData",
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
