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

                <v-btn icon v-if="showUser" @click="goToFavourite">
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn value="home">
                    <router-link to="/"><v-list-item title="Home" value="home"></v-list-item></router-link>
                </v-btn>
                <v-btn value="content">
                    <router-link to="/content"><v-list-item title="Content" value="content"></v-list-item></router-link>
                </v-btn>
                <Switch class="ml-2" />

                <Account />

            </v-toolbar-items>
        </v-app-bar>


        <!-- Mobile version -->
        <div class="d-flex d-none d-sm-flex d-md-flex ">
            <v-navigation-drawer app v-model="drawer" :class="getThem" temporary>
                <v-list class="text-center ">
                    <v-list-item value="home">
                        <router-link to="/">
                            <v-list-item-title>Home</v-list-item-title>
                        </router-link>
                    </v-list-item>
                    <v-list-item value="content">
                        <router-link to="/content">
                            <v-list-item-title>Content</v-list-item-title>
                        </router-link>
                    </v-list-item>
                    <v-list-item value="content">
                        <modalSearch :active="true" />

                    </v-list-item>
                    <v-list-item value="content">
                        <v-btn icon v-if="showUser" @click="goToFavourite">
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>

                    </v-list-item>


                </v-list>

                <v-divider class="mb-2"></v-divider>
                <v-list-item class=" d-flex align-center justify-center mt-5">
                    <v-list-item-subtitle>Switch</v-list-item-subtitle>
                    <v-list-item-action>
                        <Switch class="mx-auto " />
                    </v-list-item-action>
                </v-list-item>

                <v-list-item class="mx-auto d-flex flex-column align-start justify-center mb-5">
                    <Account />
                </v-list-item>

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

export default defineComponent({
    components: {
        Switch, modalSearch, Search, Favorite, Account
    },
    setup() {
        const store = useStore();
        const getThem = computed(() => store.getters.backgroundColor);
        const showUser = computed(() => store.getters.getAccount.input);


        const drawer = ref(false);
        return { drawer, getThem, showUser };
    },
    methods: {
        goToFavourite() {
            this.$router.push({ name: "Favorite" });
        }
    }
});

</script>
  