import { createRouter, createWebHistory } from "vue-router";

import CountryDetails from "@/components/CountryDetails";

const routes = [
  {
    path: "/:itemId",
    name: "CountryDetails",
    component: CountryDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
