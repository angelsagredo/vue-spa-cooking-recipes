<template>
    <div id="app">
        <loading ref="loading"/>
        <navbar></navbar>
        <div class="site-content section">
            <transition name="changeview" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <foot></foot>
        <cookie-law v-on:accept="getCookies" theme="elegant-cookie" buttonText="🍪Aceptarlas!">
            <div slot="message">
                Utilizamos cookies de terceros para analizar el tráfico del sitio web. <a target="_blank" href="/privacy">Saber más</a>
            </div>
        </cookie-law>
    </div>
</template>
<script>
    import Loading from './Loading'
    import Navbar from './Navbar.vue'
    import Foot from './Footer.vue'
    import CookieLaw from 'vue-cookie-law'
    import Vue from 'vue'
    import VueAnalytics from 'vue-analytics'
    import * as Config from '../config'
    export default {
        el: '#app',

        components: {
            Loading,
            Navbar,
            Foot,
            CookieLaw,
        },

        data: () => ({
            layout: null,
            defaultLayout: 'default'
        }),

        mounted () {
            this.$loading = this.$refs.loading
            if(localStorage.getItem('cookie:accepted') != null && localStorage.getItem('cookie:accepted') === 'true')
                this.getCookies()
        },

        methods: {
            getCookies() {
                var router = this.$router
                Vue.use(VueAnalytics, {
                    id: Config.gAnalyticsId,
                    router,
                    debug: {
                        sendHitTask: process.env.NODE_ENV === 'production'
                    }
                })
            }
        }
    }
</script>
