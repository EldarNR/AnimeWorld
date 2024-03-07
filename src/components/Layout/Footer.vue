<template>
    <v-footer class="d-flex flex-column footers">
        <div class="d-flex w-50 align-center px-4">
            <strong class="text-caption">Присоединяйтесь к нам в социальных сетях!</strong>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" :icon="icon" variant="plain" size="small"></v-btn>
        </div>

        <div class="px-4 py-2 text-center w-50">
            <span class="bg-grey-light-1 pa-2 rounded-xl">{{ new Date().getFullYear() }} — <strong>Anime
                    World</strong></span>
        </div>
    </v-footer>
</template>

<script lang="ts">
export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;

}

.footers {
    width: 100dvw;
}

text {
    max-width: 1280px;
}
</style>
