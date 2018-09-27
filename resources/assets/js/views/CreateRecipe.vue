<template>
    <div class="container">
        <div class="columns" :class="isUpdating ? 'disabled' : ''">
            <div class="column is-4-desktop is-offset-1-desktop is-5-tablet">
                <div class="box">
                    <image-upload v-model="isUpdating && editedRecipe.image === undefined ? recipe.image : editedRecipe.image"></image-upload>
                    <p class="help is-danger has-text-left"><has-error :form="editedRecipe" field="image"/></p>
                </div>
                <div class="box content">
                    <h4 class="title is-4">Categorías</h4>
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
                </div>
            </div>
            <div class="column is-6-desktop is-7-tablet">
                <div class="box content">
                    <div class="buttons has-addons is-right">
                        <button @click="createRecipe" class="button is-success is-small" :class="isUpdating ? 'is-loading' : ''">
                            <fa icon="save" fixed-width />Publicar
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
    import * as Config from '../config'
    import { mapState } from 'vuex'
    import ImageUpload from '../components/ImageUpload.vue'
    import Form from 'vform'

    export default{
        metaInfo () {
            return { title: 'Crear receta · Comida Saludable' }
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
                isEditing: false,
                editedRecipe: new Form({
                    name: '',
                    description: '',
                    directions: [
                        {
                            description: '',
                            image: '',
                        }
                    ],
                    image: null,
                    ingredients: [
                        {
                            quantity: '',
                            name: ''
                        }
                    ],
                    categories: [],
                }),
                isUpdating: false,
            }
        },
        computed: {
            ...mapState({
                user: state => state.auth.user,
            })
        },
        created() {
            this.$router.app.$loading.finish()
        },
        methods: {
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
            async createRecipe () {
                if(this.user != null) {
                    if(this.editedRecipe.image != null && this.editedRecipe.image instanceof File)
                        this.editedRecipe.image = await this.readImage()

                    this.isUpdating = true
                    this.$router.app.$loading.start()
                    this.editedRecipe.post(Config.apiPath + 'recipe/create').then((data) => {
                        this.$router.push({ path: `/recipe/${data.data}` })
                    }).catch(() => {
                        this.isUpdating = false
                        this.$router.app.$loading.fail()
                        this.$router.app.$loading.finish()
                    })
                }
                else {
                    this.$store.dispatch('modal/openModal')
                    var currentModal = 'register'
                    this.$store.dispatch('modal/changeModal', { currentModal })
                }
            },
        },
        components: {
            ImageUpload
        }
    }
</script>