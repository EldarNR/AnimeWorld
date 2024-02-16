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
      filter: {
        method: "",
        params: {
          genres: "",
          year: "",
        },
      },
    },
    info: {
      method: "list?id_list=",
      params: "",
    },
    new: {
      method:
        "updates?description_type=plain&playlist_type=array&items_per_page=10&page=",
      params: "1",
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
    setNewListAnimeParams(state, params) {
      state.new.params = params;
    },
    setNewListAnimeMethod(state, method) {
      state.new.method = method;
    },
    setFilterforSearch(state, param) {
      state.search.filter.params.genres = param;
    },
    setFilterforSearchYear(state, param) {
      state.search.filter.params.year = param;
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

    async fetchNewAnime({ state }) {
      try {
        const response = await axios.get(
          base + state.new.method + state.new.params
        );
        store.dispatch("getNewAnimeList", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        store.dispatch("getRequestNewAnimeList", true);
        console.log("Request Received New Ainme!");
      }
    },

    async fetchSearchAnime({ state }) {
      try {
        const response = await axios.get(
          base +
            state.search.method +
            state.search.params +
            "&genres=" +
            state.search.filter.params.genres +
            "&year=" +
            state.search.filter.params.year
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
        store.dispatch("checkError", false);
        if (response.status === 200) {
          store.dispatch("getInfo", response.data[0]);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.response.status);
        store.dispatch("checkError404", true);

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
    async fetchForFilter() {
      try {
        const responseGenres = await axios.get(
          "https://api.anilibria.tv/v3/genres"
        );
        const responseYear = await axios.get(
          "https://api.anilibria.tv/v3/years"
        );
        store.dispatch("getGenres", responseGenres.data);
        store.dispatch("getYears", responseYear.data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      } finally {
        console.log("Request Received");
      }
    },

    async fetchRandom() {
      try {
        const responseGenres = await axios.get(base + "random");
        store.dispatch("randomAnime", responseGenres.data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      } finally {
        store.dispatch("getRequestRandom", true);
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
    setNewListAnimeParams({ commit }, params) {
      commit("setNewListAnimeParams", params);
    },
    setNewListAnimeMethod({ commit }, method) {
      commit("setNewListAnimeMethod", method);
    },
    setNewListAnimeParam({ commit }, param) {
      commit("setNewListAnimeParam", param);
    },
    setFilterforSearch({ commit }, param) {
      commit("setFilterforSearch", param);
    },
    setFilterforSearchYear({ commit }, param) {
      commit("setFilterforSearchYear", param);
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
  (state) => [
    state.search.method,
    state.search.params,
    state.search.filter.params.genres,
    state.search.filter.params.year,
  ],
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

api.watch(
  (state) => [state.new.method, state.new.params],
  () => {
    api.dispatch("fetchNewAnime");
  },
  { deep: true }
);
