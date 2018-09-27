<template>
    <div>
        <p class="title is-3">Restablecer Contraseña</p>
        <form class="columns is-multiline is-mobile">
            <div class="column is-8 is-offset-2">
                <input v-model="form.email" class="login-input" type="email" placeholder="ejemplo@gmail.com">
                <p class="help is-danger has-text-left"><has-error :form="form" field="email"/></p>
            </div>
            <div class="column is-8 is-offset-2">
                <button type="submit" style="width: 100%" class="button is-primary is-outlined" :disabled="loading" :class="loading ? 'is-loading' : ''" v-on:click.prevent="reset">Restablecer mi contraseña</button>
                <p v-if="completed" class="is-small has-text-centered content">Te hemos enviado un email para restablecer tu contraseña.</p>
            </div>
        </form>
        <div class="content is-small">
            <p>Ya tienes cuenta? <a href="#" class="is-link" v-on:click.prevent="changeLoginModal('login')">Entrar</a></p>
        </div>
    </div>
</template>
<script>
    import Form from 'vform'
    import * as Config from '../../config'
    export default{
        data(){
            return{
                form: new Form({
                    email: ''
                }),
                loading: false,
                completed: false,
            }
        },
        methods: {
            changeLoginModal(currentModal) {
                this.$store.dispatch('modal/changeModal', { currentModal })
            },
            async reset () {
                this.loading = true;
                await this.form.post(Config.apiPath + 'password/email').then((data) => {
                    this.loading = false
                    this.completed = true
                    this.status = data.status
                    this.form.reset()
                }).catch((err) => {
                    this.loading = false;
                })
            }
        }
    }
</script>
