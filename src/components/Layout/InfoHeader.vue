<template>
    <v-container>
        <v-card class="mx-auto" theme="dark" variant="outlined">
            <InfoBlock :posts="post" />
        </v-card>
        <MediaPlayer :id="post.id" :franchises="post.franchises" />
        <DownloadTor :torrent="post.torrents" />
    </v-container>
</template>
  
<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue';

import MediaPlayer from '../UIElements/MediaPlayer.vue';
import InfoBlock from '../UIElements/InfoBlock.vue';
import DownloadTor from '../UIElements/DownloadTor.vue';
import { ForCard } from '../typification/List';


export default defineComponent({
    props: {
        post: {
            type: Object as PropType<ForCard>,
            required: true,
        },
    },


    components: { InfoBlock, MediaPlayer, DownloadTor },
    watch: {
        post(newVal) {
            console.log('Received props:', newVal);

        }
    },


});
</script>
  