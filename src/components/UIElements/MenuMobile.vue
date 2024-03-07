<template>
    <div class="d-flex flex-column">
        <v-list class="text-center">
            <v-list-item value="Главная">
                <router-link to="/">
                    <v-list-item-title>Главная</v-list-item-title>
                </router-link>
            </v-list-item>
            <v-list-item value="О нас">
                <router-link to="/content">
                    <v-list-item-title>О нас</v-list-item-title>
                </router-link>
            </v-list-item>
            <v-list-item value="Search" class="mt-3 mb-3">
                <modalSearch :active="true" />
            </v-list-item>
            <v-list-item value="Favourite" class="mt-3 mb-3">
                <v-btn icon @click="goToFavourite">
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
            </v-list-item>
            <v-divider class="mb-2"></v-divider>
        </v-list>
        <v-spacer></v-spacer>
        <div class="mt-auto my-auto">
            <v-list>

                <v-list-item>
                    <v-list-item class="d-flex align-center justify-center mt-5 my-auto">
                        <v-list-item-subtitle>Switch</v-list-item-subtitle>
                        <v-list-item-action>
                            <Switch class="mx-auto" />
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item class="mx-auto d-flex flex-column align-start justify-center mb-5">
                        <Account />
                    </v-list-item>
                </v-list-item>

            </v-list>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    setup() {
        const router = useRouter();
        const goToFavourite = () => {
            router.push({ name: "Favorite" });
        }
        return { goToFavourite };
    }
});
</script>