<template>
    <div>
        <privacy-form v-if="privacyFormShowing" v-on:makeRegistration="makeRegistration"></privacy-form>
        <template v-else>
            <p class="title is-3">Registrarse</p>
            <form class="columns is-multiline is-mobile">
                <div class="column is-8 is-offset-2">
                    <input v-model="form.name" class="login-input" type="text" placeholder="Nombre">
                    <p class="help is-danger has-text-left"><has-error :form="form" field="name"/></p>
                </div>
                <div class="column is-8 is-offset-2">
                    <input v-model="form.email" class="login-input" type="text" placeholder="Email">
                    <p class="help is-danger has-text-left"><has-error :form="form" field="email"/></p>
                </div>
                <div class="column is-8 is-offset-2">
                    <input v-model="form.password" class="login-input" type="password" placeholder="Contraseña">
                    <p class="help is-danger has-text-left"><has-error :form="form" field="password"/></p>
                </div>
                <div class="column is-8 is-offset-2">
                    <button type="submit" style="width: 100%" class="button is-primary" :disabled="loading || form.name == '' || form.email == '' || form.password == ''" :class="loading ? 'is-loading' : ''" v-on:click.prevent="!privacyFormShowed ? privacyFormShowing = true : makeRegistration(null)">Regístrate</button>
                </div>
            </form>
            <div class="content is-small">
                <p>Ya tienes cuenta? <a href="#" class="is-link" v-on:click.prevent="changeLoginModal('login')">Entrar</a></p>
            </div>
        </template>
    </div>
</template>
<script>
    import Form from 'vform'
    import * as Config from '../../config'
    import PrivacyForm from './PrivacyForm.vue'
    export default {
        data() {
            return {
                form: new Form({
                    name: '',
                    promotions: false,
                    privacy: false,
                    email: '',
                    password: '',
                    password_confirmation: ''
                }),
                loading: false,
                privacyFormShowed: false,
                privacyFormShowing: false,
            }
        },
        methods: {
            changeLoginModal(currentModal) {
                this.$store.dispatch('modal/changeModal', { currentModal })
            },
            makeRegistration(form) {
                this.privacyFormShowing = false

                if(form != null) {
                    this.privacyFormShowed = true
                    this.form.promotions = form.promotions
                    this.form.privacy = form.privacy
                }

                this.loading = true
                this.register().then((result) => {
                    this.loading = false
                    this.form.reset()
                    this.$store.dispatch('modal/closeModal')
                }).catch((err) => {
                    this.loading = false;
                })
            },
            async register () {
                this.form.password_confirmation = this.form.password
                // Register the user.
                const {data} = await this.form.post(Config.apiPath + 'register')
                // Log in the user.
                const {data: {token}} = await this.form.post(Config.apiPath + 'login')

                // Save the token.
                this.$store.dispatch('auth/saveToken', {token})

                await this.$store.dispatch('auth/fetchUser')
            }
        },
        components: {
            PrivacyForm
        }
    }
</script>
