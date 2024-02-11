<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-combobox v-model="select" :items="items" label="Select a favorite activity or create a new one"
                    multiple></v-combobox>
            </v-col>
            <v-col cols="12">
                <v-combobox v-model="select" :items="items" label="I use chips" multiple chips></v-combobox>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";


export default defineComponent({
    data() {
        return {
            select: ['Vuetify', 'Programming'],
            items: [
                'Programming',
                'Design',
                'Vue',
                'Vuetify',
            ],
        }
    },
    setup() {
        const fetchGetInfo = async () => {
            try {
                const response = await axios.get(
                    "https://api.anilibria.tv/v3/genres"
                );
                console.log(response);
            } catch (error: any) {
                console.error("Error fetching data:", error);
            } finally {
                console.log("Request Received");
            }
        };

        // Вызываем fetchGetInfo, когда компонент монтируется
        fetchGetInfo();

        // Возвращаем fetchGetInfo, чтобы он был доступен в компоненте
        return { fetchGetInfo };
    }
})
</script>
