<template>
    <div class="container">
        <div class="box content">
            <p>Vivimos en una sociedad en la que cada vez más, por cultura o desconocimiento acostumbra a comer poco sano.</p>
            <p>Una mala alimentación puede suponer enfermedades a largo plazo e incluso la aparición de cáncer según recientes estudios. Por ello es importante tomar consciencia de nuestra salud y empezar a alimentarnos de manera responsable.</p>
            <p>Algunos de estos malos hábitos consisten en el consumo abusivo de carnes, azúcares y harinas refinadas; así como la carencia de frutas y verduras en nuestra alimentación.</p>
            <p>ComidaSaludable.top surge frente a la dificultad de encontrar recetas variadas de cocina saludable. Queremos reunir mogollón de recetas de cocina saludables en una única plataforma social accesible y participativa.</p>
            <p>Alimentándonos saludablemente conseguiremos una salud de hierro, así como una mente y un sistema inmune envidiables.</p>
            <p>¡Desmontemos el mito de que la comida sana es aburrida!</p>
        </div>
    </div>
</template>
<script>
    export default {
        metaInfo () {
            return {
                title: 'Sobre nosotros · Comida Saludable',
            }
        },
        data(){
            return {

            }
        },
        created() {
            this.$router.app.$loading.finish()
        }
    }
</script>