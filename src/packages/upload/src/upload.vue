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
      autoUpload: {
        type: Boolean,
        default: false
      },
      beforeAdd: Function,
      beforeUpload: Function,
      afterUpload: Function,
      uploadError: Function,
      meta: {
        type: Object,
        default: function(){
          return {};
        }
      },
    },
    data(){
      return{
        fileList: []
      }
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
      addFile(files){
        if(!this.beforeAdd){
          return Array.from(files);
        }
        for(let file of files){
          let allowed = this.beforeAdd(file, files);
          if(!allowed) { 
            console.error('add file is error');
            return false
          };
          this.fileList.push(file);
        }
        return Array.from(this.fileList);
      },
      uploadFile(files){
        this.clearFileList()
        let postFiles = this.addFile(files);
        if(!postFiles) {
          return this.uploadError()
        }
        postFiles.forEach(file=>{
          if(this.autoUpload) this.upload(file);
        })
      },
      upload(file){
        if(!this.beforeUpload) {
          return this.post(file);
        };
        const before = this.beforeUpload(file);
        if(before){
          this.post(file);
        }else{
          console.error('before upload is error');
          return this.uploadError();
        }
      },
      createBase64(file){
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e){
            resolve(e.target.result);
          }
        })
      },
      async post(file){
        const base64Data = await this.createBase64(file)
        try {
          const data = await api.postUpload({base64Data, meta: this.meta});
          if(this.afterUpload) this.afterUpload(data);
        } catch (error) {
          console.log(error);
        } 
      },
      clearFileList(){
        this.fileList = [];
      }
    }
  }
</script>

<style lang="scss">
  
</style>
