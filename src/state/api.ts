// В файле с экшенами и стором Vuex
import { createStore } from "vuex";
import axios from "axios";
import { store } from ".";

const base: string = "https://api.anilibria.tv/v3/title/";

export const api = createStore({
  state: {
    api: {
      method: "schedule?",
      params: "days=1",
    },
    search: {
      method: "search?search=",
      params: "",
    },
    info: {
      method: "list?id_list=",
      params: "",
    },
    new: {
      method: "updates?",
      params: "description_type=plain&playlist_type=array&limit=12",
    },
  },
  mutations: {
    setApiParams(state, params) {
      state.api.params = params;
    },
    setSearchParams(state, params) {
      state.search.params = params;
    },
    setInfoParams(state, params) {
      state.info.params = params;
    },
  },
  actions: {
    async fetchList({ state }) {
      try {
        const response = await axios.get(
          base + state.api.method + state.api.params
        );
        store.dispatch("getList", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        store.dispatch("getRequestList", true);
        console.log("Request Received");
      }
    },

    async fetchSearchAnime({ state }) {
      try {
        const response = await axios.get(
          base + state.search.method + state.search.params
        );
        store.dispatch("getSearchList", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        store.dispatch("getRequestSearch", true);
        console.log("Request Received");
      }
    },

    //Работает через костыли :D
    async fetchGetInfo({ state, commit }) {
      try {
        const response = await axios.get(
          base + state.info.method + state.info.params
        );
        if (response.status === 200) {
          store.dispatch("checkError", false);
          store.dispatch("getInfo", response.data[0]);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.response.status);

        if (error.response.status === 404) {
          console.log("Страница не найдена (ошибка 404)");
          store.dispatch("checkError404", true);
        }
        if (error.response.status === 500) {
          console.log("Internal Server Error! (ошибка 500)");
          store.dispatch("checkError505", true);
        }
      } finally {
        store.dispatch("getRequestInfo", true);
        console.log("Request Received");
      }
    },
    async fetchNewAnime({ state }) {
      try {
        const response = await axios.get(
          base + state.new.method + state.new.params
        );
        store.dispatch("getNewAnimeList", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // store.dispatch("getRequestSearch", true);
        console.log("Request Received");
      }
    },
    setApiParams({ commit }, params) {
      commit("setApiParams", params);
    },
    setSearchParams({ commit }, params) {
      commit("setSearchParams", params);
    },
    setInfoParams({ commit }, params) {
      commit("setInfoParams", params);
    },
  },
});

// Наблюдаем за изменениями метода и параметров API и вызываем действие fetchList
api.watch(
  (state) => [state.api.method, state.api.params],
  () => {
    api.dispatch("fetchList");
  },
  { deep: true }
);

api.watch(
  (state) => [state.search.method, state.search.params],
  () => {
    api.dispatch("fetchSearchAnime");
  },
  { deep: true }
);

api.watch(
  (state) => [state.info.method, state.info.params],
  () => {
    api.dispatch("fetchGetInfo");
  },
  { deep: true }
);
