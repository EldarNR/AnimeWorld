import { createStore } from "vuex";
import { ISheduleArray } from "@/components/typification/List";
import { stat } from "fs";

export const store = createStore({
  state: {
    list: {},
    newlist: {},
    search: {},
    info: null,
    request: {
      list: false,
      search: false,
      info: false,
      newAnimeList: false,
    },

    filter: {
      Genres: [],
      Year: [],
    },

    error: {
      error404: false,
      error500: false,
    },
    backgroundColor: false,
  },
  mutations: {
    changeBackgroundColor(state, value) {
      state.backgroundColor = value;
      localStorage.setItem("theme", value); // Сохраняем тему в localStorage
    },
    setList(state, list) {
      state.list = list;
    },
    setRequestList(state, request) {
      state.request.list = request;
    },
    setRequestSearch(state, request) {
      state.request.search = request;
    },
    setSearchList(state, list) {
      state.search = list;
    },
    setInfo(state, info) {
      state.info = info;
    },
    setRequestInfo(state, request) {
      state.request.info = request;
    },
    setError404(state, boolean) {
      state.error.error404 = boolean;
    },
    setError500(state, boolean) {
      state.error.error500 = boolean;
    },
    setNewAnimeList(state, list) {
      state.newlist = list;
    },
    setRequestNewAnimeList(state, boolean) {
      state.request.newAnimeList = boolean;
    },
    getGenres(state, value) {
      state.filter.Genres = value;
    },
    getYears(state, value) {
      state.filter.Year = value;
    },
  },
  actions: {
    getList({ commit }, list) {
      commit("setList", list);
    },
    getSearchList({ commit }, list) {
      commit("setSearchList", list);
    },
    getInfo({ commit }, list) {
      commit("setInfo", list);
    },
    getNewAnimeList({ commit }, list) {
      commit("setNewAnimeList", list);
    },
    getRequestInfo({ commit }, request) {
      commit("setRequestInfo", request);
    },
    getRequestList({ commit }, request: boolean) {
      commit("setRequestList", request);
    },
    getRequestSearch({ commit }, request: boolean) {
      commit("setRequestSearch", request);
    },
    getRequestNewAnimeList({ commit }, boolean) {
      commit("setRequestNewAnimeList", boolean);
    },
    changeBackgroundColor({ commit }, newColor) {
      commit("changeBackgroundColor", newColor);
    },
    checkError404({ commit }, boolean) {
      commit("setError404", boolean);
    },
    checkError500({ commit }, boolean) {
      commit("setError500", boolean);
    },
    getYears({ commit }, value) {
      commit("getYears", value);
    },
    getGenres({ commit }, value) {
      commit("getGenres", value);
    },
  },
  getters: {
    backgroundColor(state) {
      return state.backgroundColor ? "bg-grey-darken-4" : "bg-grey-lighten-5";
    },
    backgroundColorBollen(state) {
      return state.backgroundColor;
    },
    getListAnime(state) {
      return state.list;
    },
    getNewAnimeList(state) {
      return state.newlist;
    },
    showRequestList(state) {
      return state.request.list;
    },
    showRequestSearch(state) {
      return state.request.search;
    },
    getSearchList(state) {
      return state.search;
    },
    getInfo(state) {
      return state.info;
    },
    getRequestInfo(state) {
      return state.request.info;
    },
    showError(state) {
      return state.error.error404;
    },
    showRequestNewAnimeList(state) {
      return state.request.newAnimeList;
    },
    getParamsforFilter(state) {
      return state.filter;
    },
  },
});

// Инициализируем состояние темы из localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  store.commit("changeBackgroundColor", savedTheme);

  console.log(savedTheme);
}
