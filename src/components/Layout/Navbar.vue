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

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn value="home">
                    <router-link to="/"><v-list-item title="Home" value="home"></v-list-item></router-link>
                </v-btn>
                <v-btn value="content">
                    <router-link to="/content"><v-list-item title="Content" value="content"></v-list-item></router-link>
                </v-btn>
                <Switch class="ml-2" />
                <div v-if="userInAccount" class="my-auto mx-auto"><v-avatar
                        image="https://cdn.vuetifyjs.com/images/john.jpg" size="45"></v-avatar>
                </div>

                <v-btn color="info" class="ml-2" @click="goToLogin" v-else>Login</v-btn>

            </v-toolbar-items>
        </v-app-bar>


        <!-- Mobile version -->
        <div class="d-flex d-none d-sm-flex d-md-flex ">
            <v-navigation-drawer app v-model="drawer" :class="getThem" temporary>
                <v-list class="text-center bg-red">
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

                    <v-divider></v-divider>


                </v-list>
                <template v-slot:append>
                    <v-divider class="mb-2"></v-divider>
                    <v-list-item class="d-flex align-center justify-center mt-5">
                        <v-list-item-subtitle>Switch</v-list-item-subtitle>
                        <v-list-item-action>
                            <Switch class="mx-auto " />
                        </v-list-item-action>
                    </v-list-item>

                    <v-list-item class="mx-auto d-flex flex-column align-start justify-center mb-5">
                        <div v-if="userInAccount" class="d-flex align-center">
                            <v-avatar image="https://cdn.vuetifyjs.com/images/john.jpg" size="45"></v-avatar>
                            <span class="text-h6 ml-1">Demo</span>

                        </div>
                        <v-btn color="info" class="ml-2" @click="goToLogin" v-else>Login</v-btn>
                    </v-list-item>
                </template>
            </v-navigation-drawer>
        </div>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Switch from "../UIElements/Switch.vue";
import { useStore } from 'vuex';
import modalSearch from './modalSearch.vue';
import Search from '../UIElements/Search.vue';

export default defineComponent({
    components: {
        Switch, modalSearch, Search
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: "Login" });
        }
    },
    setup() {
        const store = useStore();
        const getThem = computed(() => store.getters.backgroundColor);
        const userInAccount = computed(() => store.getters.getAccount);

        const drawer = ref(false);
        return { drawer, getThem, userInAccount };
    }
});
</script>
  