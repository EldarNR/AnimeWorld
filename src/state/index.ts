import { createStore } from "vuex";
import { Comment, IdFavorite } from "../components/typification/UIType";
import { computed } from "vue";
import { api } from "./api";
import { base } from "@/main";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";

export const store = createStore({
  state: {
    id: undefined,
    account: {
      information: {},
      favourite: {} as IdFavorite,
    },
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
      youtube: false,
      favourite: false,
    },

    randomAnime: {},

    comment: [] as Comment[],

    filter: {
      Genres: [],
      Year: [],
    },

    login: {
      alert: false,
      message: String,
    },

    youtube: {},
    error: {
      error404: false,
      error500: false,
      errorFavourite: false,
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
    BlogYoutube(state, list) {
      state.youtube = list;
    },
    ReqestYoutube(state, request) {
      state.request.youtube = request;
    },
    async showAlert(state, { boolean, message }) {
      state.login.alert = boolean;
      state.login.message = message;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      state.login.alert = !boolean;
    },
    async setUser(
      state,
      user: { name: string; remember: boolean; email: string; userUID: string }
    ) {
      state.account.information = user;
      let users = user;
      if (users.remember) {
        localStorage.setItem("saved", JSON.stringify(user));
      } else {
        localStorage.removeItem("saved");
      }
    },
    RequestAnimeFav(state, data: boolean) {
      state.request.favourite = data;
      localStorage.setItem("data", JSON.stringify(data));
    },
    setError(state, error: boolean) {
      state.error.errorFavourite = error;
    },
    AddAnimeFav(state, data: IdFavorite) {
      state.account.favourite = data;
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
    getIdAnime({ commit }, data) {
      commit("AddAnimeFav", data);
    },
    getUser({ commit }, user) {
      commit("setUser", user);
    },
  },
  getters: {
    getAccount(state) {
      return state.account;
    },
    backgroundColor(state) {
      return state.backgroundColor ? "bg-grey-lighten-5" : "bg-grey-darken-4";
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
    getBlog(state) {
      return state.youtube;
    },
    showRequestBlog(state) {
      return state.request.youtube;
    },
    getLoginAlert(state) {
      return state.login.alert;
    },
    getMessageAlert(state) {
      return state.login.message;
    },
    getFavourite(state) {
      return state.account.favourite;
    },
    getRequestFavourite(state) {
      return state.request.favourite;
    },
    getterErrorFavourite(state) {
      return state.error.errorFavourite;
    },
  },
});

// Инициализируем состояние темы из localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  store.commit("changeBackgroundColor", savedTheme);
}

const savedData = localStorage.getItem("saved");

if (savedData) {
  store.dispatch("getUser", JSON.parse(savedData));
}
