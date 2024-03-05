<template>
    <v-container>
        <span> It's my favourite anime list</span>

        <v-row class="mt-3" v-if="getRequest">
            <v-card max-height="320px" elevation="16" v-for="item in getAnimeFavourite" :key="item.uid"
                class="d-flex align-center mb-3 rounded-xl pa-3 bg-blue-grey-darken-1">

                <v-col cols="2" :xs="3" sm="3" md="3" lg="2">
                    <v-img width="200" :src="`https://anilibria.tv${item.data.img}`" class="float-right" alt="poster"
                        cover></v-img>
                </v-col>
                <v-col cols="5" sm="4" md="7" lg="8" class="mt-3 mb-2  ">
                    <v-card-item class="float-left">
                        <span class="text-sm-h5 text-body-2 text-xs-body-2 text-lg-h4 text-justify" align="start">{{
            item.data.title }}</span>
                        <span
                            class="me-1 text-caption d-none d-md-flex  text-lg-body-1 text-md-body-2 text-xl-subtitle text-justify">{{
            item.data.description
        }}</span>
                    </v-card-item>
                </v-col>
                <v-col cols="2">
                    <button @click="deleatId(item.uid)" class="noselect"><span class="text">Delete</span><span
                            class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24">
                                <path
                                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                                </path>
                            </svg></span></button>

                    <br />
                    <button @click="gotoWatch(item.data.id)" class="buttonTogo"><span class="text">Watch</span><span
                            class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24">
                                <title>play</title>
                                <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                            </svg></span></button>
                </v-col>
            </v-card>
        </v-row>

        <span v-else>
            List is empty
        </span>
    </v-container>
</template>

<script lang="ts">
import Vue, { computed, onMounted } from 'vue'
import { createVuetify } from 'vuetify'
import { useStore } from 'vuex'
import { store } from '../state'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
import { api } from '../state/api'

export default {
    setup() {
        const store = useStore();
        const getAnimeFavourite = computed(() => store.getters.getFavourite);
        const getRequest = computed(() => store.getters.getRequestFavourite);
        const checkError = computed(() => store.getters.getterErrorFavourite);


        return { getAnimeFavourite, getRequest, checkError };
    },
    methods: {
        gotoWatch(id: number) {
            this.$router.push({ name: "Serial", params: { id } });
        },
        deleatId(id: number) {
            api.dispatch("deleteId", id)
            console.log(id);
        }
    }
}
</script>

<style scoped>
.noselect {
    width: 150px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    background: red;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
    background: #e62222;
}

.buttonTogo {
    width: 150px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
    background: #2196F3;
}

button,
button span {
    transition: 200ms;
}

button .text {
    transform: translateX(35px);
    color: white;
    font-weight: bold;
}

button .icon {
    position: absolute;
    border-left: 1px solid #c41b1b;
    transform: translateX(110px);
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.buttonTogo .icon {
    position: absolute;
    border-left: 1px solid #744fd2;
    transform: translateX(110px);
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

button svg {
    width: 15px;
    fill: #eee;
}

button:hover {
    background: #ff3636;
}

.buttonTogo:hover {
    background: #1e00ff;
}

button:hover .text {
    color: transparent;
}

button:hover .icon {
    width: 150px;
    border-left: none;
    transform: translateX(0);
}

button:focus {
    outline: none;
}

button:active .icon svg {
    transform: scale(0.8);
}
</style>