// В файле с экшенами и стором Vuex
import { createStore } from "vuex";
import { getDatabase, ref, onValue } from "firebase/database";
import axios from "axios";
import { store } from ".";
import { getAuth } from "firebase/auth";
import { base } from "@/main";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const baseApi: string = "https://api.anilibria.tv/v3/title/";

export const api = createStore({
  state: {
    api: {
      method: "schedule?",
      params: "days=0",
    },
    search: {
      method: "search?search=",
      params: "",
      filter: {
        method: "",
        params: {
          genres: undefined,
          year: undefined,
        },
      },
    },
    info: {
      method: "list?id_list=",
      params: "",
    },
    youtube: {
      page: 1,
    },
    new: {
      method:
        "updates?description_type=plain&playlist_type=array&items_per_page=10&page=",
      params: "1",
    },
    accountUID: "",
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
    changePage(state, day) {
      state.youtube.page = day;
    },
    setUid(state, uid) {
      state.accountUID = uid;
    },
  },
  actions: {
    async fetchList({ state }) {
      try {
        const response = await axios.get(
          baseApi + state.api.method + state.api.params
        );
        store.dispatch("getList", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        store.dispatch("getRequestList", true);
      }
    },

    async fetchNewAnime({ state }) {
      try {
        const response = await axios.get(
          baseApi + state.new.method + state.new.params
        );
        store.dispatch("getNewAnimeList", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        store.dispatch("getRequestNewAnimeList", true);
      }
    },

    async fetchSearchAnime({ state }) {
      try {
        const response = await axios.get(
          baseApi +
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
      }
    },

    //Работает через костыли :D
    async fetchGetInfo({ state, commit }) {
      try {
        const response = await axios.get(
          baseApi + state.info.method + state.info.params
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
      }
    },

    async fetchBlog() {
      try {
        const response = await axios.get(
          "https://api.anilibria.tv/v3/youtube?items_per_page=10&page=" +
            this.state.youtube.page
        );
        store.commit("BlogYoutube", response.data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      } finally {
        store.commit("ReqestYoutube", true);
      }
    },

    async fetchRandom() {
      const ERROR_FETCHING_DATA = "Error fetching data:";

      try {
        const responseGenres = await axios.get(baseApi + "random");
        store.dispatch("randomAnime", responseGenres.data);
      } catch (error: any) {
        // Use a more specific error type if possible
        console.error(ERROR_FETCHING_DATA, error);
      } finally {
        store.dispatch("getRequestRandom", true);
      }
    },

    async userCollection() {
      const firestore = getFirestore();
      const userId = getAuth().currentUser;

      if (!userId) {
        console.log("User not found", userId);
      }
      const collectionRef = collection(firestore, `users/${userId?.uid}/likes`);

      try {
        const snapshot = await getDocs(collectionRef);
        const userFavouriteAnime = snapshot.docs.map((doc) => {
          const data = {
            uid: doc.id,
            data: doc.data(),
          };
          return { ...data }; // Возвращаем объект с id и остальными данными
        });
        store.dispatch("getIdAnime", userFavouriteAnime);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        store.commit("RequestAnimeFav", true);
      }
    },

    async deleteId({}, id: string) {
      try {
        const auth = getAuth(base);
        const firestore = getFirestore();
        const docRef = doc(
          firestore,
          `users/${auth.currentUser?.uid}/likes/${id}`
        );
        await deleteDoc(docRef);
        // If needed, perform an update after successful deletion (replace with actual update logic)
        // await updateDoc(docRef, { /* updated fields */ });
      } catch (error) {
        console.error("Error deleting document:", error);
      } finally {
        // Consider placing `api.dispatch("userCollection")` outside the `try/catch` block
        // based on your intended logic.
        api.dispatch("userCollection");
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

api.watch(
  (state) => [state.youtube.page],
  () => {
    api.dispatch("fetchBlog");
  },
  { deep: true }
);

api.watch(
  (state) => [state.accountUID],
  () => {
    api.dispatch("getAccount");
  },
  { deep: true }
);
