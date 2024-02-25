import { createStore } from "vuex";
import { Comment, IdFavorite } from "../components/typification/UIType";

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
      youtube: false,
    },

    favoriteList: [] as IdFavorite[],

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
      localStorage.setItem("boolean", boolean);
    },
    AddAnimeFav(state, data) {
      state.favoriteList.push(data);
      localStorage.setItem("saveList", data);
    },
    filterId(state, item) {
      state.favoriteList = item;
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
    getIdAnime({ commit }, data) {
      commit("AddAnimeFav", data);
    },
    filterFavorite({ commit, state }, idToRemove) {
      const updatedList = state.favoriteList.filter(
        (item) => item.id !== idToRemove
      );
      commit("filterId", updatedList);
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
    getFavoriteAnime(state) {
      return state.favoriteList;
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
      return state.login.alert ;
    },
    getMessageAlert(state) {
      return state.login.message ;
    },
  },
});

// Инициализируем состояние темы из localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  store.commit("changeBackgroundColor", savedTheme);
}

const savedAccount = localStorage.getItem("boolean");
if (savedAccount) {
  store.commit("setAccount", savedTheme);
}

const saveList = localStorage.getItem("data");
if (saveList) {
  store.dispatch("AddAnimeFav", saveList);
}
