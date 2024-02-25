<template>
    <v-footer class="d-flex flex-column">
        <div class="d-flex w-50 align-center px-4">
            <strong>Get connected with us on social networks!</strong>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="plain" size="small"></v-btn>
        </div>

        <div class="px-4 py-2 text-center w-50">
            <span class="bg-grey-light-1 pa-2 rounded-xl">{{ new Date().getFullYear() }} — <strong>Anime World</strong></span>
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

footer {
    width: 100dvw;

}

footer .text {
    max-width: 1280px;

}
</style>
