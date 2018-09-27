<template>
    <div class="container">
        <div class="columns">
            <div class="column content">
                <h1 class="has-text-centered">Mis recetas</h1>
            </div>
        </div>
        <div class="columns is-multiline">
            <template v-for="recipe in recipes.data">
                <recipe-card :recipe="recipe"></recipe-card>
            </template>
        </div>
        <div class="columns has-text-centered">
            <div class="column" v-if="isLoading">
                <div class="loading-spinner"></div>
            </div>
            <div v-cloak class="column content is-small" v-else>
                <button v-if="recipes.page < recipes.last_page" @click="getMyRecipes" class="button is-square is-white is-rounded"><fa icon="plus" fixed-width /></button>
                <p v-else>Has llegado al final de los resultados</p>
            </div>
        </div>
    </div>
</template>
<script>
    import RecipeCard from '../components/RecipeCard.vue';
    import axios from 'axios'
    import * as Config from '../config'
    export default{
        middleware: 'auth',
        metaInfo () {
            return { title: 'Mis recetas · Comida Saludable' }
        },
        data(){
            return{
                recipes: {
                    data: [],
                    last_page: null,
                    page: 0,
                },
                isLoading: false,
                showNoRecipesText: false,
            }
        },
        created() {
            this.getMyRecipes()
        },
        methods: {
            async getMyRecipes () {
                this.isLoading = true
                this.$router.app.$loading.start()
                const { data } = await axios.get(Config.apiPath + 'user/recipes?page='+(this.recipes.page+1))
                for(var i = 0; i < data.data.length; i++){
                    this.recipes.data.push(data.data[i])
                }
                this.recipes.last_page = data.last_page
                this.recipes.page++
                this.isLoading = false
                this.$router.app.$loading.finish()
            },
        },
        components: {
            RecipeCard,
        }
    }
</script>
