<template>
  <el-dialog :visible.sync="dialogVisible" width="1200px" custom-class="dialog-main" @close='handleClose'>
    <div class="upload-main">
      <div class="upload-left">
         <el-upload ref='upload' action="http://139.199.230.46:3000/upload" list-type='picture-card' :data="{type: 'file', userId: userId}" :headers="{Authorization:`Bearer ${userToken}`}" accept=".jpg, .jpeg" :on-success="handleResponse" multiple>
          <i class="fas fa-plus"></i>
         </el-upload>
      </div>
      <div class="upload-right">
        <div class="upload-btn">
          <button class="btn" @click.self="releasePhoto">发布</button>
        </div>
        <div class="upload-inputGroup">
          <label>作品标题</label>
          <input class="upload-input" type="text" v-model="photoTitle">
        </div>
        <div class="upload-inputGroup">
          <label>简介</label>
          <textarea class="upload-input" v-model="photoDesc"></textarea>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { mapState } from 'vuex';
  import api from '../../../plugin/axios.js';

  export default {
    name: 'upload',
    data(){
      return {
        photoTitle: '',
        photoDesc: ''
      }
    },
    computed: {
      ...mapState({
        userToken: state => state.user.userToken,
        userId: state => state.user.userId,
        userName: state => state.user.userName,
        visible: state => state.dialogVisible
      }),
      dialogVisible: {
        get(){
          return this.visible
        },
        set(val){
          this.$store.commit('TOOGLE_DIALOG', val)
        }
      }
    },
    methods: {
      async releasePhoto(){
        const { uploadFiles } = this.$refs.upload.$data;
        const [ { resizeSrc } ] = uploadFiles.slice(0, 1);
        const photoNormal = uploadFiles.map( file => file.normalSrc );
        const releaseData = await api.postRelease({
          data: {
            photoTitle: this.photoTitle,
            photoAvatar: this.userName,
            photoDesc: this.photoDesc,
            photoNormal: photoNormal,
            photoCover: resizeSrc,
            userId: this.userId
          }
        })
        const { data: { status, message, data: { id }} } = releaseData;
        if(status === 466){
          this.$message({ message, type: 'error', onClose: this.handleClose});
        }else{
          this.$message({ message, type: 'info', onClose: this.handleClose});
          this.$router.push({ name: 'imageView', params: { id }});
        }
      },
      handleClose(){
        this.dialogVisible = false;
        this.$refs.upload.clearFiles();
        this.photoTitle = '';
        this.photoDesc = '';
      },
      handleResponse(data, file){
        const { data: dataSrc } = data;
        file.resizeSrc = dataSrc.find(src => src.includes('resize'));
        file.normalSrc = dataSrc.find(src => src.includes('normal'));
      }
    }
  }
</script>

<style lang="scss">
  .upload-main{
    max-height: 400px;
    overflow-y: auto;
    display: flex;
  }
  .upload-left{
    width: 800px;
    margin-right: 20px;
    border-right: 1px dashed #edeff0;
  }
  .upload-right{
    width: 340px;
    
  }
  .upload-btn{
    width: 100%;
    padding: 0 15px;  
    margin-bottom: 15px;
    & .btn{
      width: 100%;
    }
  }
  .upload-inputGroup{
    padding: 0 15px;
    margin-bottom: 15px;
    & label{
      display: block;
      margin-bottom: 15px;
    }
    & textarea{
      height: 200px;
    }
  }
  .upload-input{
    width: 100%;
    padding: 0px 5px;
    height: 30px;
    line-height: 30px;
  }
</style>
