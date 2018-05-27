<template>
  <div class="mi-upload" @click="handleClick">
    <input type="file" class="mi-upload-input" ref="input" @change="handleChange" :accept="accept" :multiple="multiple">
    <slot></slot>
  </div>
</template>

<script>
import api from '../../../plugin/axios';

  export default {
    name: 'MiUpload',
    data(){
      return {
        uploadFiles: []
      }
    },
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      accept: {
        type: String,
        default: '.jpg, .jpeg'
      },
      type: {
        type: String,
      },
      meta: {
        type: Object,
        default: function(){
          return {};
        }
      },
      afterUpload: Function
    },
    methods: {
      handleClick(){
        this.$refs.input.value = null;
        this.$refs.input.click();
      },
      handleChange(){
        const files = this.$refs.input.files;
        this.uploadFile(files);
      },
      uploadFile(files){  
        this.uploadFiles = this.multiple ? Array.from(files) : Array.from(files).slice(0, 1);
        this.uploadFiles.forEach(file => {
          this.post(file);
        })
      },
      async post(file){
        try {
          const formData = this.createFormData(file, this.meta);
          const data = await api.postUpload({ data: formData, params: { type: this.meta.type }});
          if(this.afterUpload) this.afterUpload(data);
        } catch (error) {
          console.log(error);
        }
      },
      createFormData(file, meta){
        const formData = new FormData();
        Object.keys(meta).forEach(key => {
          formData.append(key, meta[key]);
        })
        formData.append('file', file);
        return formData;
      }
    }
  }
</script>


