<template>
	<div>
		<figure v-if="image" class="image is-square bg-grey" :style="'background-position: center center; background-repeat: no-repeat; background-size: contain; background-image: url('+image+')'"></figure>
		<button class="button is-small is-light" style="position: absolute; top: 5px; right: 5px" @click="close">
			<span class="icon is-small">
				<fa icon="times" fixed-width />
			</span>
		</button>
	</div>
</template>
<script type="text/javascript">
	import * as Config from '../config'
	export default {
		props: {
			preview: {
			    type: [String, File],
			    default: null,
			}
		},
		data() {
			return {
				image: null,
				imagePath: Config.imagePath,
			}
		},
		created() {
			this.setPreview()
		},
		watch: {
			'preview': 'setPreview'
		},
		methods: {
			setPreview() {
				if(this.preview instanceof File ) {
					const fileReader = new FileReader()
					fileReader.onload = (event) => {
					  this.image = event.target.result
					}
					fileReader.readAsDataURL(this.preview)
				} else if (typeof this.preview === 'string') {
					if(this.preview.indexOf('data:image') == -1)
						this.image = this.imagePath+this.preview
					else
						this.image = this.preview
				} else {
					this.image = null
				}
			},
			close() {
				this.$emit('close')
			}
		}
	}
</script>
