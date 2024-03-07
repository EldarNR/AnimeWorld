import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { registerPlugins } from "@/plugins";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import App from "./App.vue";
import { store } from "../src/state/index";
import { api } from "./state/api";
import { firebaseConfig } from "./state/firebase";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: () => import("../src/page/MainPage.vue"),
    },
    {
      name: "Content",
      path: "/content/",
      component: () => import("../src/page/Content.vue"),
    },
    {
      name: "Serial",
      path: "/content/:id",
      component: () => import("./page/Serial.vue"),
      meta: {
        requiresData: true,
      },
      props: true,
    },
    {
      name: "Login",
      path: "/login",
      component: () => import("./page/Login.vue"),
    },
    {
      name: "Favorite",
      path: "/content/favorite",
      component: () => import("./page/Favorite.vue"),
    },
    {
      name: "Error404",
      path: "/:catchAll(.*)",
      component: () => import("./page/Error/Error404.vue"),
      meta: {
        isErrorPage: true,
      },
    },

    {
      path: "/content/:catchAll(.*)",
      component: () => import("./page/Error/Error404.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresData) {
    api
      .dispatch("setInfoParams", to.params.id)
      .then(() => {
        next();
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных Vuex:", error);
      });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.isErrorPage) {
    // Это ошибка 404, выполните соответствующие действия
    console.log("Ошибка 404");
  }
  next();
});

const app = createApp(App);
// Initialize Firebase
export const base = initializeApp(firebaseConfig);
const analytics = getAnalytics(base);

registerPlugins(app);
app.use(store);
app.use(router);

app.mount("#app");
