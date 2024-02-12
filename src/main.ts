import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { registerPlugins } from "@/plugins";

import App from "./App.vue";
import MainPage from "../src/page/MainPage.vue";
import Content from "../src/page/Content.vue";
import { store } from "../src/state/index";
import SerialVue from "./page/Serial.vue";
import { api } from "./state/api";
import Error404Vue from "./page/Error/Error404.vue";

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
  // Если маршрут требует данных Vuex
  if (to.meta.requiresData) {
    // Загрузите данные Vuex для маршрута, используя идентификатор контента
    api
      .dispatch("setInfoParams", to.params.id)
      .then(() => {
        next();
      })
      .catch((error) => {
        // Обработка ошибок при загрузке данных
        console.error("Ошибка загрузки данных Vuex:", error);
        // Можно перенаправить на страницу ошибки или показать сообщение пользователю
        // Например: next({ path: "/error" });
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

registerPlugins(app);
app.use(store);
app.use(router);

app.mount("#app");
