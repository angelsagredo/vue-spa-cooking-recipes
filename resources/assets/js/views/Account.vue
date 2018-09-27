<template>
    <div class="container">
        <div class="columns">
            <div class="column is-3-desktop is-4-tablet is-offset-1-tablet is-offset-1-desktop">
                <div class="panel has-background-white">
                    <a class="panel-block" @click="activeSection='profile'" :class="activeSection == 'profile' ? 'is-active' : ''">Editar perfil</a>
                    <a class="panel-block" @click="activeSection='password'" :class="activeSection == 'password' ? 'is-active' : ''">Cambiar contraseña</a>
                    <a class="panel-block" @click="activeSection='deleteAccount'" :class="activeSection == 'deleteAccount' ? 'is-active' : ''">Eliminar mi cuenta</a>
                </div>
            </div>
            <div class="column is-7-desktop is-6-tablet">
                <div class="box is-radiusless">
                    <div class="columns">
                        <div class="column is-8-desktop is-offset-2-desktop">
                            <form class="content">
                                <template v-if="activeSection == 'profile'">
                                    <div class="field is-horizontal">
                                        <div class="field-label is-normal">
                                            <label class="label">Nombre</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                                <div class="control">
                                                    <input v-model="profile.name" class="input" name="name" type="text">
                                                    <p class="help is-danger has-text-left"><has-error :form="profile" field="name"/></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field is-horizontal">
                                        <div class="field-label is-normal">
                                            <label class="label">Email</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                                <div class="control">
                                                    <input v-model="profile.email" class="input" name="email" type="email">
                                                    <p class="help is-danger has-text-left"><has-error :form="profile" field="email"/></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="checkbox">
                                            <input v-model="profile.promotions" type="checkbox">
                                            Recibir ofertas especiales y promociones
                                        </label>
                                    </div>
                                    <button v-on:click.prevent="updateProfile" type="submit" :disabled="isUpdating || !profileChanged" :class="isUpdating ? 'is-loading' : ''" class="button is-small is-success">Enviar</button>
                                </template>
                                <template v-if="activeSection == 'password'">
                                    <div class="field is-horizontal">
                                        <div class="field-label is-normal column is-5 is-paddingless">
                                            <label class="label">Contraseña actual</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                                <div class="control">
                                                    <input v-model="password.password" class="input" type="password">
                                                    <p class="help is-danger has-text-left"><has-error :form="password" field="password"/></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field is-horizontal">
                                        <div class="field-label is-normal column is-5 is-paddingless">
                                            <label class="label">Contraseña nueva</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                                <div class="control">
                                                    <input v-model="password.new_password" class="input" type="password" name="new_password">
                                                    <p class="help is-danger has-text-left"><has-error :form="password" field="new_password"/></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field is-horizontal">
                                        <div class="field-label is-normal column is-5 is-paddingless">
                                            <label class="label">Confirmar nueva contraseña</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                                <div class="control">
                                                    <input v-model="password.password_confirmation" class="input" type="password" name="password_confirmation">
                                                    <p class="help is-danger has-text-left"><has-error :form="password" field="password_confirmation"/></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button v-on:click.prevent="updatePassword" type="submit" :disabled="isUpdating" :class="isUpdating ? 'is-loading' : ''" class="button is-small is-success">Enviar</button>
                                </template>
                                <template v-if="activeSection == 'deleteAccount'">
                                    <div class="field is-horizontal">
                                        <div class="field-label is-normal column is-5 is-paddingless">
                                            <label class="label">Contraseña actual</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                                <div class="control">
                                                    <input v-model="accountDelete.password" class="input" type="password" name="password">
                                                    <p class="help is-danger has-text-left"><has-error :form="accountDelete" field="password"/></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field has-text-centered">
                                        <button v-on:click.prevent="deleteAccount" type="submit" :disabled="isUpdating || accountDelete.password == ''" :class="isUpdating ? 'is-loading' : ''" class="button is-small is-danger">Eliminar mi cuenta</button>
                                    </div>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Form from 'vform'
    import * as Config from '../config'
    export default{
        middleware: 'auth',
        metaInfo () {
            return { title: 'Cuenta · Comida Saludable' }
        },
        data(){
            return {
                activeSection: 'profile',
                password: new Form({
                    password: '',
                    new_password: '',
                    password_confirmation: ''
                }),
                profile: new Form({
                    name: '',
                    email: '',
                    promotions: null,
                }),
                accountDelete: new Form({
                    password: '',
                }),
                profileChanged: false,
                isUpdating: false,
            }
        },
        created() {
            this.profile.name = this.user.name
            this.profile.email = this.user.email
            this.profile.promotions = (this.user.promotions == '1' ? true : false)
            this.$router.app.$loading.finish()
        },
        computed: {
            ...mapState({
                user: state => state.auth.user,
            })
        },
        methods: {
            async updatePassword () {
                this.isUpdating = true
                this.$router.app.$loading.start()
                await this.password.patch(Config.apiPath + 'settings/password').then(() => {
                    this.isUpdating = false
                    this.$router.app.$loading.finish()
                    this.password.reset()
                }).catch(() => {
                    this.isUpdating = false
                    this.$router.app.$loading.fail()
                    this.$router.app.$loading.finish()
                })
            },
            async updateProfile () {
                this.isUpdating = true
                this.$router.app.$loading.start()
                await this.profile.patch(Config.apiPath + 'settings/profile').then((data) => {
                    this.profileChanged = false
                    this.isUpdating = false
                    this.$router.app.$loading.finish()
                    this.$store.dispatch('auth/updateUser', { user: data.data })
                }).catch(() => {
                    this.isUpdating = false
                    this.$router.app.$loading.fail()
                    this.$router.app.$loading.finish()
                })
            },
            async deleteAccount() {
                this.isUpdating = true
                this.$router.app.$loading.start()
                await this.accountDelete.post(Config.apiPath + 'settings/account/delete').then((data) => {
                    this.isUpdating = false
                    this.$router.app.$loading.finish()
                    this.$store.dispatch('auth/removeUser')
                    this.$router.push({ path: '/' })
                }).catch(() => {
                    this.isUpdating = false
                    this.$router.app.$loading.fail()
                    this.$router.app.$loading.finish()
                })
            }
        },
        watch: {
            'profile.name': function (val) {
                if(this.profile.name != this.user.name)
                    this.profileChanged = true
            },
            'profile.email': function (val) {
                if(this.profile.email != this.user.email)
                    this.profileChanged = true
            },
            'profile.promotions': function (val) {
                if(this.profile.promotions != this.user.promotions)
                    this.profileChanged = true
            },
        }
    }
</script>
