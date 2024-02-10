<template>
    <v-container v-if="!checkError">
        <InfoHeader v-if="getInfoRequest" :post="getListInfo" />
        <Loading class="mx-auto my-auto" v-else />
    </v-container>

    <Error404Vue v-else-if="checkError" class="mx-5 my-5" />
    <Error500 v-else />
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';

import InfoHeader from '../components/Layout/InfoHeader.vue';
import Loading from '../components/UIElements/Loading.vue';
import Error404Vue from './Error/Error404.vue';
import Error500 from './Error/Error500.vue';

export default {
    components: { InfoHeader, Loading, Error404Vue, Error500 },

    setup() {
        const store = useStore();
        const getListInfo = computed(() => store.getters.getInfo);
        const getInfoRequest = computed(() => store.getters.getRequestInfo);
        const checkError = computed(() => store.getters.showError404);
        // 
        console.log(getListInfo);

        const show404Error = ref(false);


        return {
            getListInfo, getInfoRequest, show404Error, checkError
        };
    }
}
</script>

