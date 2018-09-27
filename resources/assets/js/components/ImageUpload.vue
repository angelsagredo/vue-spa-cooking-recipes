<template>
    <div>
        <figure class="image bg-grey" v-if="value">
            <image-preview :preview="value" @close="$emit('input', null)"></image-preview>
        </figure>
        <div class="image-upload" v-else>
            <div class="field image-upload--button">
                <div class="file is-primary is-small">
                    <label class="file-label">
                        <input class="file-input" type="file" accept="image/*" @change="upload">
                        <span class="file-cta">
                        <span class="file-icon">
                            <fa icon="camera" size="2x" fixed-width />
                        </span>
                        <span class="file-label">
                            &nbsp;Seleccionar imagen...
                        </span>
                    </span>
                    </label>
                </div>
                <p v-if="error" class="help is-danger">La imagen supera 2MB</p>
                <p v-else class="help">Máximo 2MB</p>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
	import ImagePreview from './ImagePreview.vue'
	export default {
        data(){
            return {
                error: false
            }
        },
		components: {
			ImagePreview
		},
		props: {
			value: {
			    type: [String, File],
			    default: null
			}
		},
		methods: {

			upload(e) {
				const files = e.target.files
				if (files && files.length > 0) {
				    if(files[0].size > 2000000)
				        this.error = true
                    else {
                        this.error = false
                        this.$emit('input', files[0])
                    }
				}
			}
		}
	}
</script>
