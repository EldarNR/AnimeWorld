
<template>
    <v-list-item class="mx-auto d-flex flex-column align-start justify-center ">
        <div v-if="userInAccount" class="d-flex align-center">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-list id="user" class="pl-1 pr-2 my-auto" :class="changeColor" v-bind="props" style="cursor: pointer">
                        <v-avatar image="https://cdn.vuetifyjs.com/images/john.jpg" size="45"></v-avatar>
                        <span class="text-h6 ml-1">Demo</span>
                    </v-list>
                </template>

                <v-list align="center">
                    <v-btn color="error" class="bg-red-lighten-1" @click="Logout">Log out</v-btn>
                </v-list>
            </v-menu>

        </div>
        <v-btn color="info" class="ml-2" @click="goToLogin" v-else>Login</v-btn>
    </v-list-item>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { store } from '../../state';

export default {
    setup() {
        const store = useStore();

        const userInAccount = computed(() => store.getters.getAccount);
        const changeColor = computed(() => store.getters.backgroundColor);

        const drawer = ref(false);
        return { drawer, userInAccount, changeColor };
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: "Login" });
        },
        Logout() {
            store.dispatch("getAccountInfo", false);
        }
    },
}
</script>