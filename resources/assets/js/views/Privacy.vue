<template>
    <div class="container">
        <div class="content is-small">
            <h1 class="has-text-centered">Política de privacidad</h1>
        </div>
    </div>
</template>
<script>
    export default{
        metaInfo () {
            return {
                title: 'Política de privacidad · Comida Saludable',
            }
        },
        data(){
            return{

            }
        },
        created() {
            this.$router.app.$loading.finish()
        },
    }
</script>