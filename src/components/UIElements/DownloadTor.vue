<template>
    <section id="table" class="mx-auto ma-2">
        <h1>Torrent</h1>
        <v-table max-height="400px" class="text-center" :class="getThem" elevation="16">
            <thead>
                <tr>
                    <th class="text-center">
                        ID
                    </th>
                    <th class="text-center">
                        Серии
                    </th>
                    <th class="text-center">
                        Ссылки
                    </th>
                    <th class="text-center">
                        Файл
                    </th>
                    <th class="text-center">
                        Размер
                    </th>
                    <th class="text-center">
                        Скачали/Раздачи
                    </th>

                </tr>
            </thead>
            <tbody v-for="(items, i) in torrent.list" :key="i">
                <tr>
                    <td>
                        {{ i }}
                    </td>
                    <td>
                        {{ items.episodes.string }}
                    </td>
                    <td><a :href="items.magnet">
                            <v-icon size="35">mdi-download-circle-outline</v-icon>
                        </a>
                    </td>
                    <td>
                        {{ items.quality.resolution }}
                    </td>
                    <td>
                        {{ items.size_string }}
                    </td>
                    <td>
                        {{ items.downloads }} / {{ items.leechers }}
                    </td>
                </tr>
            </tbody>
        </v-table>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Torrents } from "../typification/Torrent";
import { useStore } from 'vuex';


export default {
    props: {
        torrent: {
            type: Object as PropType<Torrents>,
            required: true,

        },


    },
    setup() {

        const store = useStore();
        const getThem = computed(() => store.getters.backgroundColor);

        return { getThem }

    }
}
</script>