import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { registerPlugins } from "@/plugins";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import App from "./App.vue";
import { store } from "../src/state/index";
import { api } from "./state/api";
import { firebaseConfig } from "./state/firebase";
import MainPage from "../src/page/MainPage.vue";
import Content from "../src/page/Content.vue";
import Serial from "../src/page/Serial.vue";
import Login from "../src/page/Login.vue";
import Favorite from "../src/page/Favorite.vue";
import Error404 from "../src/page/Error/Error404.vue";

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
      component: Serial,
      meta: {
        requiresData: true,
      },
      props: true,
    },
    {
      name: "Login",
      path: "/login",
      component: Login,
    },
    {
      name: "Favorite",
      path: "/content/favorite",
      component: Favorite,
    },

    {
      path: "/content/:catchAll(.*)",
      component: Error404,
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
