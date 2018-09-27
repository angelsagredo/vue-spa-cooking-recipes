<template>
    <div class="column is-one-quarter-fullhd is-one-third-desktop is-6-tablet">
        <div class="card is-recipe">
            <router-link :to="'/recipe/'+recipe.id+'-'+urlName(recipe.name)">
                <div v-if="recipe.image != null" class="card-image" :style="'background-image: url('+imagePath+recipe.image+')'"></div>
                <div v-else class="card-image card-image--no-image" style="background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiID8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEyN3B0IiBoZWlnaHQ9IjE1NHB0IiB2aWV3Qm94PSIwIDAgMTI3IDE1NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBpZD0iI2UzZTZlOGZmIj4KPHBhdGggZmlsbD0iI2UzZTZlOCIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gOTcuMTMgMC4wMCBMIDk3LjQ0IDAuMDAgQyA5Ni42NCA0Ljg0IDk2LjA1IDkuNzEgOTUuMjAgMTQuNTUgQyA5My42NSAyMi45MyA4Ny42NSAzMC4zMiA3OS43OSAzMy42MSBDIDc0Ljg1IDM1LjgyIDY5LjM1IDM1Ljg5IDY0LjEwIDM2Ljg2IEMgNjUuNDkgNDEuMDMgNjUuNzMgNDUuNDYgNjUuMzMgNDkuODEgQyA3NC4yNSAzNy4xMiA5Mi42NSAzMi4zNiAxMDYuNTQgMzkuMzggQyAxMTkuMjMgNDUuNTUgMTI2LjQ2IDU5LjYyIDEyNy4wMCA3My4zNiBMIDEyNy4wMCA3My42MSBDIDEyNy4wNiA4OS4yOCAxMTkuMjMgMTA0LjMzIDEwNy41NiAxMTQuNTMgQyA5Mi43NSAxMjcuNjggNzguMDIgMTQwLjkwIDYzLjE3IDE1NC4wMCBMIDYzLjAzIDE1NC4wMCBDIDUwLjU4IDE0Mi43NiAzOC4xNiAxMzEuNDggMjUuNzIgMTIwLjIzIEMgMjAuMzQgMTE1LjMzIDE0LjY0IDExMC42MiAxMC40MSAxMDQuNjMgQyAzLjk4IDk1LjY4IC0wLjA1IDg0LjgwIDAuMDAgNzMuNzEgTCAwLjAwIDczLjUxIEMgMC40OSA2Mi4zNCA1LjA2IDUxLjAyIDEzLjc3IDQzLjc2IEMgMjAuNDEgMzguMDYgMjkuNDIgMzUuMzMgMzguMTEgMzYuMzMgQyA0Ni44MiAzNy4xNCA1NC45MSA0MS44OCA2MC4zNSA0OC42NyBDIDYxLjAwIDM3Ljk0IDU1LjkyIDI2LjQ3IDQ2LjM2IDIxLjA2IEMgNDQuMjUgMTkuNzkgNDUuNzkgMTYuMjAgNDguMTkgMTYuNTkgQyA1My45NSAxOC45NyA1OC4wMSAyNC4wMiA2MS4wOSAyOS4yNSBDIDYxLjMzIDIwLjQzIDY1LjE4IDExLjQ5IDcyLjY1IDYuNDUgQyA3OS43MiAxLjI1IDg4Ljg1IDEuNTAgOTcuMTMgMC4wMCBNIDMzLjUwIDUxLjczIEMgMjIuOTMgNTQuMTIgMTQuODAgNjQuMTggMTQuNzMgNzUuMDIgQyAxNC41OCA3Ni4zNyAxNS43NSA3Ny45NSAxNy4yMSA3Ny42OCBDIDE5LjE3IDc3Ljg3IDE5LjY0IDc1LjQ5IDE5LjUzIDc0LjAwIEMgMTkuOTcgNjUuMTkgMjcuMTggNTcuMzAgMzUuOTEgNTYuMDggQyAzNy44MiA1NS41NSA0MC42MCA1Ni40MyA0MS41MCA1NC4wOCBDIDQxLjY5IDQ5LjcxIDM2LjE2IDUxLjMwIDMzLjUwIDUxLjczIFoiIC8+CjwvZz4KPC9zdmc+Cg==')"></div>
            </router-link>
            <div class="card-content" style="height: 111px; align-items: center; display: flex;">
                <div class="media">
                    <div class="media-content">
                        <router-link :to="'/recipe/'+recipe.id+'-'+urlName(recipe.name)">
                            <h2 class="title is-5 card-title">{{ recipe.name }}</h2>
                            <p class="subtitle is-7 card-subtitle">por {{ recipe.user.name }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as Config from '../config'
    export default{
        data(){
            return{
                imagePath: Config.imagePath,
            }
        },
        methods: {
            urlName(recipeName) {
                return recipeName.replace(/ /g,'-')
            }
        },
        props: ['recipe']
    }
</script>
