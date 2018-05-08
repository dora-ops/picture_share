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
          const base64Data = await this.createWebpImage(file);
          const data = await api.postUpload({ base64Data, meta: this.meta }); 
          if(this.afterUpload) this.afterUpload(data);
        } catch (error) {
          console.log(error);
        }
      },
      async createWebpImage(file){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = await this.createImage(file);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/webp');
      },
      createImage(file){
        return new Promise((resolve, reject) => {
          const fileRead = new FileReader();
          const img = new Image();
          img.onload = function(){
            resolve(img);
          }
          fileRead.readAsDataURL(file);
          fileRead.onload = function(e){
            img.src = e.target.result;
          }
        })
      }
    }
  }
</script>


