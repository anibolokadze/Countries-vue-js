import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import CountryDetails from "../components/CountryDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/countries/:name",
    name: "CountryDetails",
    component: CountryDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
