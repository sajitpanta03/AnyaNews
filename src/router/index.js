import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@/components/Welcome.vue";
import SingleNews from "@/components/SingleNews.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Welcome,
    },
    {
      path: "/news/:id",
      name: "singleNew",
      component: SingleNews,
    },
  ],
});

export default router;
