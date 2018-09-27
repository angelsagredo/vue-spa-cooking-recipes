<template>
    <div class="container">
        <div v-if="recipe != null" class="columns" :class="isUpdating ? 'disabled' : ''">
            <div class="column is-4-desktop is-offset-1-desktop is-5-tablet" v-if="isEditing || recipe.categories.length > 0 || recipe.image != null">
                <div class="box" v-if="isEditing || (!isEditing && recipe.image != null)">
                    <template v-if="!isEditing">
                        <figure class="image bg-grey">
                            <img :src="imagePath+recipe.image">
                        </figure>
                    </template>
                    <template v-else>
                        <image-upload v-model="isUpdating && editedRecipe.image === undefined ? recipe.image : editedRecipe.image"></image-upload>
                        <p class="help is-danger has-text-left"><has-error :form="editedRecipe" field="image"/></p>
                    </template>
                </div>
                <div class="box content" v-if="isEditing || (!isEditing && recipe.categories.length > 0)">
                    <h4 class="title is-4">Categorías</h4>
                    <template v-if="!isEditing">
                        <span v-for="category in recipe.categories" class="tag is-rounded" style="margin: 0 4px 4px 0">
                            {{ category.name }}
                        </span>
                    </template>
                    <template v-else>
                        <div class="columns">
                            <div class="column is-unselectable">
                                <template v-for="category in categories">
                                    <label class="checkbox">
                                        <span class="tag is-rounded" style="margin: 0 4px 4px 0">
                                            <input :value="category" v-model="editedRecipe.categories" type="checkbox">
                                            &nbsp;{{ category.name }}
                                        </span>
                                    </label>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="column" :class="isEditing || recipe.categories.length > 0 || recipe.image != null ? 'is-6-desktop is-7-tablet' : 'is-6-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet'">
                <div v-if="!isEditing" class="box content">
                    <div class="buttons has-addons is-right" v-if="user != null && user.role == 'admin'">
                        <button v-if="recipe.approved == 0" @click="approveRecipe" class="button is-light is-small">
                            <fa icon="check" fixed-width />Aprobar
                        </button>
                        <v-popover>
                            <button class="button is-light is-small"><fa icon="times" fixed-width />Eliminar</button>

                            <template slot="popover">
                                <div class="has-text-centered">
                                    <span class="is-small content">¿Seguro?</span>
                                    <button v-on:click.prevent="adminDeleteRecipe" class="button is-danger is-small">Sí</button>
                                </div>
                            </template>
                        </v-popover>
                    </div>
                    <div class="buttons has-addons is-right" v-if="user != null && user.id == recipe.user.id">
                        <button @click="editRecipe" class="button is-light is-small">
                            <fa icon="edit" fixed-width />Editar
                        </button>
                        <v-popover>
                            <button class="button is-light is-small"><fa icon="times" fixed-width />Eliminar</button>

                            <template slot="popover">
                                <div class="has-text-centered">
                                    <span class="is-small content">¿Seguro?</span>
                                    <button v-on:click.prevent="deleteRecipe" class="button is-danger is-small">Sí</button>
                                </div>
                            </template>
                        </v-popover>
                    </div>
                    <h1 class="title is-3" style="line-height: 28px; margin-top: 0">{{ recipe.name }}</h1>
                    <p v-if="user != null && user.id != recipe.user.id" class="subtitle is-6 has-text-grey"><b>por {{ recipe.user.name }}</b></p>
                    <p class="recipe__description">{{ recipe.description }}</p>
                    <h4 class="title is-4">Ingredientes</h4>
                    <ul>
                        <li v-for="ingredient in recipe.ingredients">
                            <span class="has-highlight"><strong>{{ ingredient.quantity }}</strong> {{ ingredient.name }}</span>
                        </li>
                    </ul>
                    <h4 class="title is-4">Pasos</h4>
                    <ul>
                        <li class="recipe__direction" v-for="(direction, index) in recipe.directions">
                            <p><span class="tag tag--direction">{{ index+1 }}</span> {{ direction.description }}</p>
                        </li>
                    </ul>
                </div>

                <div v-else class="box content">
                    <div class="buttons has-addons is-right">
                        <button @click="updateRecipe" class="button is-success is-small" :class="isUpdating ? 'is-loading' : ''">
                            <fa icon="save" fixed-width />Guardar
                        </button>
                        <button @click="isEditing = false" class="button is-light is-small" :disabled="isUpdating">
                            <fa icon="times" fixed-width />Cancelar
                        </button>
                    </div>
                    <input type="text" placeholder="Nombre de la receta" class="input is-medium" v-model="editedRecipe.name">
                    <p class="help is-danger has-text-left"><has-error :form="editedRecipe" field="name"/></p>
                    <textarea class="textarea" placeholder="Qué puedes contar de esta receta? Escribe algo bonito :)" v-model="editedRecipe.description"></textarea>
                    <p class="help is-danger has-text-left"><has-error :form="editedRecipe" field="description"/></p>
                    <h4 class="title is-4">Ingredientes</h4>
                    <div class="columns is-mobile">
                        <div class="column is-5 is-6-mobile">
                            <p class="has-text-centered">Cantidad / unidad</p>
                        </div>
                        <div class="column is-6 is-6-mobile">
                            <p class="has-text-centered">Ingrediente</p>
                        </div>
                        <div class="column is-1">
                        </div>
                    </div>
                    <div class="columns is-mobile" v-for="(ingredient, index) in editedRecipe.ingredients">
                        <div class="column is-5">
                            <input v-model="ingredient.quantity" type="text" class="input is-small" :placeholder="index == 0 ? '1 cucharadita' : ''">
                            <p class="help is-danger has-text-left"><has-error :form="editedRecipe" :field="'ingredients.'+index+'.quantity'"/></p>
                        </div>
                        <div class="column is-6">
                            <input v-model="ingredient.name" type="text" class="input is-small" :placeholder="index == 0 ? 'pimentón' : ''">
                            <p class="help is-danger has-text-left"><has-error :form="editedRecipe" :field="'ingredients.'+index+'.name'"/></p>
                        </div>
                        <div class="column is-1">
                            <div class="buttons is-right">
                                <button class="button is-small is-light" @click="removeIngredient(index)"><span class="icon is-small"><fa icon="times" fixed-width /></span></button>
                            </div>
                        </div>
                    </div>
                    <p class="help is-danger has-text-left"><has-error :form="editedRecipe" field="ingredients"/></p>
                    <div class="buttons is-centered">
                        <button @click="addIngredient" class="button is-small is-info">
                            <fa icon="plus" fixed-width />Añadir
                        </button>
                    </div>
                    <h4 class="title is-4">Pasos</h4>
                    <p class="has-text-centered">Descripción</p>
                    <div class="columns is-mobile" v-for="(direction, index) in editedRecipe.directions">
                        <div class="column is-11">
                            <textarea v-model="direction.description" type="text" class="textarea" :placeholder="'Paso ' + (index+1)"></textarea>
                            <p class="help is-danger has-text-left"><has-error :form="editedRecipe" :field="'directions.'+index+'.description'"/></p>
                        </div>
                        <div class="column is-1">
                            <div class="buttons is-right">
                                <button class="button is-small is-light" @click="removeDirection(index)"><span class="icon is-small"><fa icon="times" fixed-width /></span></button>
                            </div>
                        </div>
                    </div>
                    <p class="help is-danger has-text-left"><has-error :form="editedRecipe" field="directions"/></p>
                    <div class="buttons is-centered">
                        <button @click="addDirection" class="button is-small is-info">
                            <fa icon="plus" fixed-width />Añadir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import * as Config from '../config'
    import { mapState } from 'vuex'
    import ImageUpload from '../components/ImageUpload.vue'
    import Form from 'vform'

    export default{
        metaInfo () {
            return { title: this.recipeName }
        },
        data(){
            return{
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
                recipe: null,
                isEditing: false,
                editedRecipe: null,
                isUpdating: false,
                imagePath: Config.imagePath,
            }
        },
        computed: {
            ...mapState({
                user: state => state.auth.user,
            }),
            recipeName() {
                if(this.recipe != null)
                    return this.recipe.name+' · Comida Saludable'
                else
                    return 'Receta · Comida Saludable'
            }
        },
        created() {
            this.getRecipe()
        },
        methods: {
            editRecipe() {
                this.editedRecipe = new Form({
                    name: '',
                    description: '',
                    directions: [],
                    image: null,
                    ingredients: [],
                })
                this.editedRecipe.name = this.recipe.name
                this.editedRecipe.description = this.recipe.description
                this.editedRecipe.image = this.recipe.image
                this.editedRecipe.ingredients = []
                for(var i = 0; i < this.recipe.ingredients.length; i++) {
                    this.editedRecipe.ingredients.push({
                        quantity: this.recipe.ingredients[i].quantity,
                        name: this.recipe.ingredients[i].name,
                        id: this.recipe.ingredients[i].id
                    })
                }
                this.editedRecipe.directions = []
                for(var i = 0; i < this.recipe.directions.length; i++) {
                    this.editedRecipe.directions.push({
                        description: this.recipe.directions[i].description,
                        image: null,
                        id: this.recipe.directions[i].id,
                    })
                }
                this.editedRecipe.categories = []
                for(var i = 0; i < this.recipe.categories.length; i++) {
                    this.editedRecipe.categories.push({
                        id: this.recipe.categories[i].id,
                        name: this.recipe.categories[i].name,
                    })
                }
                this.isEditing = true
            },
            addIngredient() {
                this.editedRecipe.ingredients.push({
                    quantity: '',
                    name: ''
                })
            },
            addDirection() {
                this.editedRecipe.directions.push({
                    description: '',
                    image: '',
                })
            },
            removeIngredient(index) {
                this.editedRecipe.ingredients.splice(index, 1)
            },
            removeDirection(index) {
                this.editedRecipe.directions.splice(index, 1)
            },
            async readImage() {
                return new Promise((resolve, reject) => {
                    var reader = new FileReader()
                    reader.onload = function (e) {
                        resolve(reader.result)
                    }
                    reader.readAsDataURL(this.editedRecipe.image)
                })
            },
            async updateRecipe () {
                if(this.editedRecipe.image != null && this.editedRecipe.image instanceof File)
                    this.editedRecipe.image = await this.readImage()

                if(this.editedRecipe.image != null && this.editedRecipe.image.indexOf('data:image') == -1)
                    this.editedRecipe.image = undefined

                this.isUpdating = true
                this.$router.app.$loading.start()
                this.editedRecipe.patch(Config.apiPath + 'recipe/' + this.$route.params.id).then(() => {
                    this.getRecipe().then(() => {
                        this.isUpdating = false
                        this.isEditing = false
                    })
                }).catch(() => {
                    this.isUpdating = false
                    this.$router.app.$loading.fail()
                    this.$router.app.$loading.finish()
                })
            },
            async getRecipe () {
                await axios.get(Config.apiPath + 'recipe/' + this.$route.params.id).then((data) => {
                    this.recipe = data.data
                    this.$router.app.$loading.finish()
                }).catch(() => {
                    this.$router.push({path: '/not-found'})
                    this.$router.app.$loading.finish()
                })
            },
            async deleteRecipe() {
                this.isUpdating = true
                this.$router.app.$loading.start()
                await axios.delete(Config.apiPath + 'recipe/' + this.$route.params.id)
                this.$router.push({name: 'my-recipes'})
            },
            async adminDeleteRecipe() {
                this.isUpdating = true
                this.$router.app.$loading.start()
                await axios.delete(Config.apiPath + 'admin/recipe/' + this.$route.params.id)
                this.$router.push({path: '/admin-panel'})
            },
            async approveRecipe() {
                this.isUpdating = true
                this.$router.app.$loading.start()
                await axios.patch(Config.apiPath + 'admin/recipe/' + this.$route.params.id + '/approve')
                this.$router.push({path: '/admin-panel'})
            }
        },
        components: {
            ImageUpload
        }
    }
</script>