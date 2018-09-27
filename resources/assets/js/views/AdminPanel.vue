<template>
    <div class="container">
        <div class="content">
            <h1 class="content has-text-centered">Admin panel</h1>
        </div>
        <div class="tabs is-centered">
            <ul>
                <li @click="activeTab = 'recipes'" :class="activeTab == 'recipes' ? 'is-active' : ''"><a>Recetas sin aprobar</a></li>
                <li @click="activeTab = 'users'" :class="activeTab == 'users' ? 'is-active' : ''"><a>Usuarios</a></li>
            </ul>
        </div>
        <template v-if="activeTab == 'recipes'">
            <div class="columns is-multiline">
                <template v-for="recipe in recipes.data">
                    <recipe-card :recipe="recipe"></recipe-card>
                </template>
            </div>
            <div class="columns has-text-centered">
                <div class="column" v-if="isLoadingRecipes">
                    <div class="loading-spinner"></div>
                </div>
                <div v-cloak class="column content is-small" v-else>
                    <button v-if="recipes.page < recipes.last_page" @click="getRecipes" class="button is-square is-white is-rounded"><fa icon="plus" fixed-width /></button>
                    <p v-else>Has llegado al final de los resultados</p>
                </div>
            </div>
        </template>
        <template v-if="activeTab == 'users'">
            <table class="table is-striped is-fullwidth">
                <tbody>
                <template v-for="user in users.data">
                    <tr>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.created_at }}</td>
                        <td>
                            <v-popover class="is-pulled-right">
                                <button class="button is-danger is-small"><fa icon="times" fixed-width />Eliminar</button>

                                <template slot="popover">
                                    <div class="has-text-centered">
                                        <span class="is-small content">¿Seguro?</span>
                                        <button v-on:click.prevent="deleteUser(user.id)" class="button is-danger is-small">Sí</button>
                                    </div>
                                </template>
                            </v-popover>
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
            <div class="columns has-text-centered">
                <div class="column" v-if="isLoadingUsers">
                    <div class="loading-spinner"></div>
                </div>
                <div v-cloak class="column content is-small" v-else>
                    <button v-if="users.page < users.last_page" @click="getUsers" class="button is-square is-white is-rounded"><fa icon="plus" fixed-width /></button>
                    <p v-else>Has llegado al final de los resultados</p>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import RecipeCard from '../components/RecipeCard.vue';
    import axios from 'axios'
    import * as Config from '../config'
    export default{
        middleware: ['auth', 'admin'],
        metaInfo () {
            return { title: 'Admin panel · Comida Saludable' }
        },
        data(){
            return{
                recipes: {
                    data: [],
                    last_page: null,
                    page: 0,
                },
                users: {
                    data: [],
                    last_page: null,
                    page: 0,
                    count: 0,
                },
                isLoadingRecipes: false,
                isLoadingUsers: false,
                activeTab: 'recipes',
            }
        },
        created() {
            this.getRecipes()
            this.getUsers()
        },
        methods: {
            async getRecipes () {
                this.isLoadingRecipes = true
                this.$router.app.$loading.start()
                const { data } = await axios.get(Config.apiPath + 'admin/recipes?page='+(this.recipes.page+1))
                for(var i = 0; i < data.data.length; i++){
                    this.recipes.data.push(data.data[i])
                }
                this.recipes.last_page = data.last_page
                this.recipes.page++
                this.isLoadingRecipes = false
                this.$router.app.$loading.finish()
            },
            async getUsers () {
                this.isLoadingUsers = true
                this.$router.app.$loading.start()
                const { data } = await axios.get(Config.apiPath + 'admin/users?page='+(this.users.page+1))
                for(var i = 0; i < data.users.data.length; i++){
                    this.users.data.push(data.users.data[i])
                }
                this.users.count = data.count
                this.users.last_page = data.users.last_page
                this.users.page++
                this.isLoadingUsers = false
                this.$router.app.$loading.finish()
            },
            async deleteUser(id) {
                this.$router.app.$loading.start()
                await axios.delete(Config.apiPath + 'admin/user/' + id)
                this.users.data = []
                this.users.page = 0
                await this.getUsers()
            }
        },
        components: {
            RecipeCard,
        }
    }
</script>
