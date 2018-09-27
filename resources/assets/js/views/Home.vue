<template>
    <recipe-cards></recipe-cards>
</template>
<script>
    import RecipeCards from '../components/RecipeCards.vue';
    export default{
        metaInfo () {
            return {
                title: 'Comida Saludable - La mejor plataforma de recetas saludables de cocina',
                meta: [
                    { name: 'description', content: 'Las mejores recetas de comida saludable. Descubre, crea y comparte recetas variadas de cocina saludable.' }
                ]
            }
        },
        data(){
            return{

            }
        },
        components: {
            RecipeCards
        },
    }
</script>
