<template>
    <div>
        <!-- Desktop version -->
        <v-app-bar app :elevation="8" :class="getThem">
            <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <router-link to="/">AnimeWorld</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down mr-5">

                <modalSearch />

                <v-btn icon @click="goToFavourite">
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn value="Главная">
                    <router-link to="/"><v-list-item title="Главная" value="Главная"></v-list-item></router-link>
                </v-btn>
                <v-btn value="О нас">
                    <router-link to="/content"><v-list-item title="О нас" value="О нас"></v-list-item></router-link>
                </v-btn>
                <Switch class="ml-2" />

                <Account />

            </v-toolbar-items>
        </v-app-bar>

        <!-- Mobile version -->

        <div class="d-flex d-none d-sm-flex d-md-flex ">
            <v-navigation-drawer app v-model="drawer" temporary>
                <MenuMobileVue />
            </v-navigation-drawer>
        </div>


    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import Switch from "../UIElements/Switch.vue";
import { useStore } from 'vuex';
import modalSearch from './modalSearch.vue';
import Search from '../UIElements/Search.vue';
import Favorite from '../../page/Favorite.vue';
import Account from '../UIElements/Account.vue';
import MenuMobileVue from '../UIElements/MenuMobile.vue';
export default defineComponent({
    components: {
        Switch, modalSearch, Search, Favorite, Account, MenuMobileVue
    },
    data() {
        return {
            drawer: false,
        };
    },
    setup() {
        const store = useStore();
        const getThem = computed(() => store.getters.backgroundColor);

        return { getThem, };
    },
    methods: {
        goToFavourite() {
            this.$router.push({ name: "Favorite" });
        }
    }
});

</script>