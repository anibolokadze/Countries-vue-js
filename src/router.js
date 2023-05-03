import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/country-details",
    name: "CountryDetails",
    component: () => import("./components/CountryDetails.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
export default router;
