<template>
    <div class="container">
        <div class="columns">
            <div :class="isLoading ? 'disabled' : ''" class="column is-unselectable has-text-centered is-selectable">
                <span :class="selectedCategories.length == 0 ? 'is-primary' : ''" class="tag is-rounded is-white" @click="selectedCategories = []">Todo</span>
                <template v-for="category in categories">
                    <label class="checkbox">
                        <span :class="selectedCategories.indexOf(category.id) != -1 ? 'is-primary' : ''" class="tag is-rounded is-white" style="margin: 0 4px 4px 0">
                            <input :value="category.id" v-model="selectedCategories" type="checkbox" style="display: none">
                            {{ category.name }}
                        </span>
                    </label>
                </template>
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
                <button v-if="recipes.page < recipes.last_page" @click="getRecipes" class="button is-square is-white is-rounded"><fa icon="plus" fixed-width /></button>
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
        data(){
            return{
                recipes: {
                    data: [],
                    last_page: null,
                    page: 0,
                },
                selectedCategories: [],
                isLoading: false,
                categories: [{
                    id: 1,
                    name: 'Ensaladas',
                },{
                    id: 2,
                    name: 'Entrantes',
                },{
                    id: 3,
                    name: 'Plato principal'
                },{
                    id: 4,
                    name: 'Vegano',
                },{
                    id: 5,
                    name: 'Bebidas y zumos',
                },{
                    id: 6,
                    name: 'Postres',
                },{
                    id: 7,
                    name: 'Repostería',
                },{
                    id: 8,
                    name: 'Para picar'
                }],
            }
        },
        created() {
            this.getRecipes()
        },
        methods: {
            async getRecipes () {
                this.isLoading = true
                this.$router.app.$loading.start()
                const { data } = await axios.post(Config.apiPath + 'recipes?page='+(this.recipes.page+1), {'categories': this.selectedCategories})
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
        },
        watch: {
            'selectedCategories': function (val) {
                this.recipes.data = []
                this.recipes.page = 0
                this.getRecipes()
            }
        }
    }
</script>
