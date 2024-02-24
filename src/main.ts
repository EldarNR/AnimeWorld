import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { registerPlugins } from "@/plugins";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import App from "./App.vue";
import MainPage from "../src/page/MainPage.vue";
import Content from "../src/page/Content.vue";
import { store } from "../src/state/index";
import SerialVue from "./page/Serial.vue";
import { api } from "./state/api";
import Error404Vue from "./page/Error/Error404.vue";
import LoginVue from "./page/Login.vue";
import { firebaseConfig } from "./state/firebase";
import FavoriteVue from "./page/Favorite.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: MainPage,
    },
    {
      name: "Content",
      path: "/content/",
      component: Content,
    },
    {
      name: "Serial",
      path: "/content/:id",
      component: SerialVue,
      meta: {
        requiresData: true,
      },
      props: true,
    },
    {
      name: "Login",
      path: "/login",
      component: LoginVue,
    },
    {
      name: "Favorite",
      path: "/content/favorite",
      component: FavoriteVue,
    },
    {
      name: "Error404",
      path: "/:catchAll(.*)",
      component: Error404Vue,
      meta: {
        isErrorPage: true,
      },
    },

    { path: "/content/:catchAll(.*)", component: Error404Vue },
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
