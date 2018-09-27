<template>
    <div>
        <p class="title is-3">Iniciar Sesión</p>
        <form class="columns is-multiline is-mobile">
            <div class="column is-8 is-offset-2">
                <input v-model="form.email" class="login-input" type="email" placeholder="hola@comidasaludable.top">
                <p class="help is-danger has-text-left"><has-error :form="form" field="email"/></p>
            </div>
            <div class="column is-8 is-offset-2">
                <input v-model="form.password" class="login-input" type="password" placeholder="*******">
                <p class="help is-danger has-text-left"><has-error :form="form" field="password"/></p>
                <div class="content is-small">
                    <br>
                    <p><a href="#" class="is-link" v-on:click.prevent="changeLoginModal('resetPassword')">He olvidado mi contraseña</a></p>
                </div>
            </div>
            <div class="column is-8 is-offset-2">
                <button type="submit" style="width: 100%" class="button is-primary is-outlined" :disabled="loading" :class="loading ? 'is-loading' : ''" v-on:click.prevent="makeLogin">Entrar</button>
            </div>
        </form>
        <div class="content is-small">
            <p>No tienes cuenta? Haz clic <a href="#" class="is-link" v-on:click.prevent="changeLoginModal('register')">Aquí</a></p>
        </div>
    </div>
</template>

<script>
import Form from 'vform'
import * as Config from '../../config'
export default{
    data() {
        return {
            form: new Form({
                email: '',
                password: ''
            }),
            loading: false,
        }
    },
    methods: {
        changeLoginModal(currentModal) {
            this.$store.dispatch('modal/changeModal', { currentModal })
        },
        makeLogin() {
            this.loading = true;
            this.login().then((result) => {
                this.loading = false;
                this.form.reset()
                this.$store.dispatch('modal/closeModal')
            }).catch((err) => {
                this.loading = false;
            })
        },
        async login () {
            // Submit the form.
            const {data} = await this.form.post(Config.apiPath + 'login')

            // Save the token.
            this.$store.dispatch('auth/saveToken', {
                token: data.token,
            })

            // Fetch the user.
            await this.$store.dispatch('auth/fetchUser')
        }
    }
}
</script>
