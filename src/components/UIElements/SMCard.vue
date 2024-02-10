<template>
    <v-card class="mx-auto " width="100%" :title="post.names.ru" :subtitle="post.description" elevation="16">
        <template v-slot:prepend>
            <v-avatar color="blue-darken-2" size="100" rounded="0">
                <v-img :src="`https://anilibria.tv${post.posters.small.url}`" alt="poster" cover />
            </v-avatar>
        </template>
        <template v-slot:append>
            <router-link :to="{ name: 'Serial', params: { id: post.id } }">
                <v-btn color="success">Перейти</v-btn>
            </router-link>
        </template>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Post {
    id: number,
    names: names,
    description: string,
    posters: small
}

interface small {
    small: {
        url: string
    }
}

interface names {
    ru: string
    eng: string
}

export default defineComponent({
    props: {
        post: {
            type: Object as PropType<Post>,
            required: true,
        },
    },
})
</script>
