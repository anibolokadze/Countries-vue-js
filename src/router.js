import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/country/:id",
    name: "CountryDetails",
    component: CountryDetails,
    props: true,
  },
];

const router = createRouter({
  routes,
});

export default router;
