<template>
    <div>
        <div class="column is-10 is-offset-1">
            <p class="title is-3">Información Personal</p>
            <p>Comida Saludable respalda tu derecho a estar informado sobre el uso de datos en nuestros servicios. Puedes revisar estos ajustes y nuestra Política de privacidad.</p>
        </div>
        <div class="column is-10 is-offset-1">
            <label class="checkbox">
                <input type="checkbox" v-model="form.promotions">
                Recibir ofertas especiales y promociones
            </label>
        </div>
        <div class="column is-10 is-offset-1">
            <label class="checkbox">
                <input type="checkbox" v-model="form.privacy">
                <a target="_blank" href="/privacy">Acepto la Política de Privacidad de Datos</a>
            </label>
        </div>
        <div class="column is-8 is-offset-2">
            <button type="submit" style="width: 100%" class="button is-primary" :disabled="!form.privacy" v-on:click.prevent="makeRegistration">Aceptar y registrarse</button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                form: {
                    promotions: false,
                    privacy: false,
                }
            }
        },
        methods: {
            makeRegistration() {
                this.$emit('makeRegistration', this.form)
            }
        }
    }
</script>
