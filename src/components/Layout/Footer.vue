<template>
    <v-footer class="text-center d-flex flex-column align-center justify-end ">
        <div>

            <div class="footers">
                <v-btn v-for="icon in icons" :key="icon" class="mx-auto" :icon="icon" variant="text"></v-btn>


                <div class="text-caption text text-sm-caption text-md-body-1 text-lg-body-1 text-xl-h6 mr-3 mb-3 text-justify"
                    style="">
                    Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum.
                    Praesent
                    ut
                    risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit
                    amet
                    dui.
                    Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum
                    ultrices,
                    cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius
                    natoque
                    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </div>
            </div>

            <v-divider></v-divider>

            <div>
                {{ new Date().getFullYear() }} — <strong>Anime World</strong>
            </div>
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
