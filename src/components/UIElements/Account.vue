
<template>
    <v-list-item class="mx-auto d-flex flex-column align-start justify-center ">
        <div v-if="userInAccount.input" class="d-flex align-center">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-list id="user" class="pl-1 pr-2 my-auto" :class="changeColor" v-bind="props" style="cursor: pointer">
                        <v-avatar color="grey-darken-3"
                            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>

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
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { store } from '../../state';
import { getAuth } from 'firebase/auth';

export default {
    setup() {
        const store = useStore();

        const userInAccount = computed(() => store.getters.getAccount);
        const changeColor = computed(() => store.getters.backgroundColor);


        function login() {
            const db = ref(getDatabase());
            get(child(db, "users")).then((snapshot) => {

                console.log(snapshot)
            })

        }



        return { userInAccount, changeColor, login };
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: "Login" });
        },
        Logout() {
            store.commit("setAccount", { boolean: false, rememberme: false });
        }
    }
}
</script>
