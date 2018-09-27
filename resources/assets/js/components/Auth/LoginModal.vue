<template>
    <div class="modal modal-fx-fadeInScale">
        <div class="modal-background" @click="closeLoginModal">
        </div>
        <div class="modal-content">
            <div class="box column is-8 is-offset-2">
                <figure class="image is-48x48 has-image-centered">
                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiID8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEyN3B0IiBoZWlnaHQ9IjE1NHB0IiB2aWV3Qm94PSIwIDAgMTI3IDE1NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBpZD0iIzAwYzZhOWZmIj4KPHBhdGggZmlsbD0iIzAwYzZhOSIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gNzIuNTcgNi41MSBDIDc5Ljc0IDEuMjQgODkuMDMgMS40NiA5Ny40MyAwLjAxIEMgOTYuNDQgNS42MSA5Ni4wMSAxMS4zMSA5NC42MyAxNi44MyBDIDkyLjQ4IDI0LjUxIDg2LjU0IDMxLjAwIDc5LjEyIDMzLjg5IEMgNzQuMzQgMzUuNzMgNjkuMTcgMzYuMDEgNjQuMTYgMzYuODMgQyA2NS4zMSA0MS4wMiA2NS43MyA0NS4zOCA2NS4zNiA0OS43MSBDIDcxLjUxIDQxLjM5IDgxLjYzIDM2LjE3IDkxLjk5IDM2LjE2IEMgMTAxLjM4IDM1LjkxIDExMC42MyA0MC4xOSAxMTYuNzkgNDcuMjMgQyAxMjMuMjAgNTQuMzIgMTI2LjQ2IDYzLjgxIDEyNy4wMCA3My4yNiBMIDEyNy4wMCA3NS43NCBDIDEyNi4yNiA5MC42NiAxMTguNzIgMTA0Ljc4IDEwNy41NSAxMTQuNTMgQyA5Mi43MyAxMjcuNjcgNzguMDIgMTQwLjk0IDYzLjEyIDE1NC4wMCBMIDYzLjA5IDE1NC4wMCBDIDQ4LjMyIDE0MC43NiAzMy42NyAxMjcuMzkgMTguOTcgMTE0LjA5IEMgOC4wOSAxMDQuNDMgMC44MSA5MC41NiAwLjAwIDc1Ljk1IEwgMC4wMCA3My40NSBDIDAuNTIgNjIuMDUgNS4zMCA1MC41MSAxNC4zNSA0My4yOCBDIDIyLjIwIDM2LjgyIDMzLjE2IDM0LjYwIDQyLjk1IDM3LjIxIEMgNDkuOTAgMzguOTMgNTUuODIgNDMuMzQgNjAuNDkgNDguNjQgQyA2MC43NCA0MC4zMyA1Ny45NSAzMS44NSA1Mi4zMiAyNS42NyBDIDUwLjI4IDIzLjQ2IDQ3LjM4IDIyLjIxIDQ1LjQ0IDE5LjkwIEMgNDQuOTUgMTguMTIgNDYuMzMgMTYuNjYgNDguMDkgMTYuNTkgQyA1My45MiAxOC44NSA1Ny45MSAyNC4wMiA2MS4wNyAyOS4xOCBDIDYxLjQwIDIwLjQzIDY1LjE2IDExLjU0IDcyLjU3IDYuNTEgTSAzMy40NSA1MS43NSBDIDIyLjYxIDU0LjIxIDE0LjIwIDY0Ljg2IDE0LjgxIDc2LjAyIEMgMTUuMzEgNzguMDQgMTguNDYgNzguNDAgMTkuMTkgNzYuMzggQyAxOS43OCA3Mi44NSAxOS45NSA2OS4xMSAyMS44OSA2NS45OCBDIDI1LjIxIDU5LjcwIDMyLjA1IDU1LjkzIDM5LjA3IDU1LjY4IEMgNDEuNzcgNTYuMDYgNDIuNDYgNTEuNjkgMzkuNzYgNTEuMjQgQyAzNy42NSA1MC45OSAzNS41MSA1MS4yNyAzMy40NSA1MS43NSBaIiAvPgo8L2c+Cjwvc3ZnPgo=">
                </figure>
                <br>
                <transition name="changeview" mode="out-in">
                    <login v-if="modal.currentModal=='login'"></login>
                    <register v-if="modal.currentModal == 'register'"></register>
                    <reset-password v-if="modal.currentModal == 'resetPassword'"></reset-password>
                </transition>
            </div>
        </div>
        <button class="modal-close is-large" @click="closeLoginModal" aria-label="close"></button>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Login from './Login.vue'
    import Register from './Register.vue'
    import ResetPassword from './ResetPassword.vue'

    export default{
        data(){
            return{

            }
        },
        computed: {
            ...mapState({
                modal: state => state.modal.modal,
            })
        },
        methods: {
            closeLoginModal() {
                this.$store.dispatch('modal/closeModal')
            },
        },
        components: {
            Login, Register, ResetPassword
        }
    }
</script>
