import { createRouter, createWebHistory } from "vue-router";
import CountryDetails from "./components/CountryDetails.vue";
import Home from "./components/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/country/:name",
    name: "country-detail",
    component: CountryDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
