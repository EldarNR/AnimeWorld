<template>
    <v-img lazy-src="https://i.pinimg.com/originals/3d/95/20/3d9520c2498c25eac5b6407de070cb6f.gif" width="100dvw"
        height="42dvh" alt="gif_header" cover fluid>
        <div class="box d-flex align-center">
            <v-main class="d-flex align-start justify-center text-center mb-7">
                <v-card variant="outlined" class="mb-5 pa-4" loading color="deep-purple-lighten-3" link elevation="18"
                    hover>
                    <div class="text-h6 text-sm-h5 text-md-h4 text-lg-h2 text-xl-h1 ">Anime
                        World</div>
                    <div class="ml-3 text-sm-caption text-md-body-1 text-lg-h5 text-xl-h3 mr-3 mb-3">Your
                        favorite anime
                        is
                        here!</div>
                </v-card>
            </v-main>
        </div>
    </v-img>
</template>
  
<script lang="ts">
export default {

}
</script>
  
<style scoped>
.box {
    height: 100%;
    background-color: rgba(33, 33, 33, 0.7);
    /* Используйте rgba для установки прозрачного цвета */
}
</style>
  