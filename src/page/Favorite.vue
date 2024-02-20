<template>
    <v-container>
        It's my favourite anime list

        <v-row v-if="getFavoriteList.length !== 0">
            <v-card v-for="(item, i) in getFavoriteList" class="d-flex align-center" :key="i">
                {{ i }}
                <v-col cols="2" class="bg-red" >
                    <v-img width="200" :src="`https://anilibria.tv${item.img}`" class="float-right" alt="poster" cover></v-img>
                </v-col>
                <v-col cols="2" class="mt-3 mb-2">

                    <v-card-item class="float-right" two-line>
                        <v-card-title>{{ item.title }}</v-card-title>

                        <span class="me-1">{{ item.description }}</span>



                    </v-card-item>
                </v-col>
            </v-card>



        </v-row>
        <div v-else>

            List empty
        </div>
    </v-container>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'
import { useStore } from 'vuex'
export default {

    setup() {
        const store = useStore();
        const getFavoriteList = computed(() => store.getters.getFavoriteAnime);

        return { getFavoriteList };
    }
}
</script>