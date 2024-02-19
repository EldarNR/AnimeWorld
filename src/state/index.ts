import { createStore } from "vuex";
import { Comment } from "@/components/typification/Comment";
import { stat } from "fs";

export const store = createStore({
  state: {
    id: undefined,
    account: false,
    list: {},
    newlist: {},
    search: {},
    info: null,
    request: {
      list: false,
      search: false,
      info: false,
      newAnimeList: false,
      randomAnime: false,
    },

    randomAnime: {},

    comment: [] as Comment[],

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
    addComment(state, comment) {
      state.comment.push(comment);
    },
    getIdPAGE(state, id) {
      state.id = id;
    },
    randomAnime(state, data) {
      state.randomAnime = data;
    },
    RequestRandom(state, request) {
      state.request.randomAnime = request;
    },
    setAccount(state, boolean) {
      state.account = boolean;
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
    addComment({ commit }, comment) {
      commit("addComment", comment);
    },
    getIdPage({ commit }, id) {
      commit("getIdPAGE", id);
    },
    randomAnime({ commit }, data) {
      commit("randomAnime", data);
    },
    getRequestRandom({ commit }, request) {
      commit("RequestRandom", request);
    },
    getAccountInfo({ commit }, boolean) {
      commit("setAccount", boolean);
    },
  },
  getters: {
    getAccount(state) {
      return state.account;
    },
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
    getComments(state) {
      return state.comment;
    },
    showIdPage(state) {
      return state.id;
    },
    getRandomAnime(state) {
      return state.randomAnime;
    },
    getRequestRandom(state) {
      return state.request.randomAnime;
    },
  },
});

// Инициализируем состояние темы из localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  store.commit("changeBackgroundColor", savedTheme);

  console.log(savedTheme);
}
