<template>
    <header>
        <!-- Desktop version -->
        <v-app-bar app :elevation="8">
            <v-app-bar-nav-icon @click="drawer = !drawer" class="d-sm-none"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <router-link to="/">AnimeWorld</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down mr-5">

                <modalSearch :active="true" />
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn value="home">
                    <router-link to="/"><v-list-item title="Home" value="home"></v-list-item></router-link>
                </v-btn>
                <v-btn value="content">
                    <router-link to="/content"><v-list-item title="Content" value="content"></v-list-item></router-link>
                </v-btn>
                <Switch />
            </v-toolbar-items>
        </v-app-bar>


        <!-- Mobile version -->
        <div class="d-flex d-sm-none">
            <v-navigation-drawer app v-model="drawer" temporary>
                <v-list class="text-center">
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
                    <v-list-item class="d-flex align-center justify-center mt-5">
                        <v-list-item-subtitle>Switch</v-list-item-subtitle>
                        <v-list-item-action class="d-flex align-center">
                            <Switch class="ma-1" />
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </div>
    </header>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Switch from "../UIElements/Switch.vue";
import modalSearch from './modalSearch.vue';

export default defineComponent({
    components: {
        Switch, modalSearch
    },
    setup() {
        const drawer = ref(false);
        return { drawer };
    }
});
</script>
  