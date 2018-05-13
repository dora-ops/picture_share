<template>
  <div class="mi-upload" @click="handleClick">
    <input type="file" class="mi-upload-input" ref="input" @change="handleChange" :accept="accept">
    <slot></slot>
  </div>
</template>

<script>
import api from '../../../plugin/axios';

  export default {
    name: 'MiUpload',
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      accept: {
        type: String,
        default: 'image/*'
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
      beforeUpload: Function,
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
        const handleFiles = Array.from(files);
        const postFiles = this.multiple ? handleFiles : handleFiles.slice(0, 1);
        if(this.beforeUpload){
          const before = this.beforeUpload(postFiles);
          if(before){
            postFiles.forEach(file => {
              this.post(file);
            })
          return ;
          }else{
            throw new Error(' beforeUpload is error');
          }
        }
        postFiles.forEach(file => {
          this.post(file);
        }) 
      },
      async post(file){
        try {
          const formData = this.createFormData(file, this.meta);
          const data = await api.postUpload({ data: formData, params: { type: this.meta.type}});
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


