
<template>
    <div class="mx-auto my-auto">
        <h1>Error 404</h1>
        <h2>This page does not exist</h2>
        <router-link :to="{ name: 'Home' }">
            <v-btn class="mt-2">
                Back!
            </v-btn>
        </router-link>
    </div>
</template>

<script lang="ts">
export default {
    computed: {
        isErrorPage() {
            return this.$route.meta.isErrorPage || false;
        },
    },
};
</script>