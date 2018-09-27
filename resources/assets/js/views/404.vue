<template>
    <div class="container">
        <div class="columns">
            <div class="column content">
                <h1 class="has-text-centered">Error 404, página no encontrada</h1>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        metaInfo () {
            return {
                title: 'Página no encontrada · Comida Saludable',
                meta: [
                    { name: 'robots', content: 'noindex,nofollow' }
                ]
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