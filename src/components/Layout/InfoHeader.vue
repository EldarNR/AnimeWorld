<template>
    <v-container>

        <v-card class="mx-auto" theme="dark" variant="outlined">
            <InfoBlock :posts="post" />
        </v-card>

        <MediaPlayer :id="post.id" :franchises="post.franchises" />
        <DownloadTor :torrent="post.torrents" />
        <Comment :id="post.id" />
        <Comments :id="post.id" />
    </v-container>
</template>
  
<script lang="ts">
import { defineComponent, PropType } from 'vue';

import MediaPlayer from '../UIElements/MediaPlayer.vue';
import InfoBlock from '../UIElements/InfoBlock.vue';
import DownloadTor from '../UIElements/DownloadTor.vue';
import { ForCard } from '../typification/List';
import Comment from '../UIElements/BlockComment.vue';
import Comments from '../UIElements/Comments.vue';
import { store } from '../../state';


export default defineComponent({
    props: {
        post: {
            type: Object as PropType<ForCard>,
            required: true,
        },
    },


    components: { InfoBlock, MediaPlayer, DownloadTor, Comment, Comments },
    watch: {
        post({ id }) {
            this.$router.push({ name: "Serial", params: { id } });
            store.dispatch("getIdPage", { id });
        }
    },


});
</script>
  