<template>
  <el-dialog :visible.sync="dialogVisible" width="1200px" custom-class="dialog-main" @close='handleClose'>
    <div class="upload-main">
      <div class="upload-left">
         <el-upload ref='upload' action="http://139.199.230.46:3000/upload" list-type='picture-card' :data="{type: 'file', userId: userId}" :headers="{Authorization:`Bearer ${userToken}`}" accept=".jpg, .jpeg" :on-success="handleUploadFile" :on-remove="handleRemove">
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
          <label>作品分类</label>
          <select class="upload-input" v-model="photoCategory">
            <option v-for="(category, index) in categoryArr" :key="index" :value="category.category">{{category.categoryName}}</option>
          </select>
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
  import { releasePhoto } from '../../../API/index.js';
  import { categorys } from '../../../config/config.js';
  import validators from '../../../plugin/valid';

  export default {
    name: 'upload',
    data(){
      return {
        photoTitle: '',
        photoDesc: '',
        categoryArr: categorys,
        photoCategory: '',
        resizeFileList: [],
        normalFileList: [],
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
      },
      valid(){
        const validator = validators();
        validator.add(this.photoTitle, [{
          name: 'isNull',
          error: '标题不能为空'
        }])

        validator.add(this.photoCategory, [{
          name: 'isNull',
          error: '分类不能为空'
        }])

        validator.add(this.photoDesc, [{
          name: 'isNull',
          error: '简介不能为空'
        }])

        validator.add(this.normalFileList, [{
          name: 'isMinLength',
          allowed: 1,
          error: '请添加图片'
        }])
        
        let errorMsg = validator.run();
        return errorMsg;
      }
    },
    methods: {
      async releasePhoto(){
        if(this.valid){
          this.$message({ message: this.valid, type: 'error'});
        }else{
          let photoData = this.createPhotoData();
          let resData = await releasePhoto(photoData);
          console.log(resData);
          if(resData){
            this.$message({ message: resData.message, type: 'info', onClose: this.handleClose});
            this.$router.push({ name: 'imageView', params: { id: resData.id }});
          }
        }
      },
      createPhotoData(){
        let photoCover = this.resizeFileList[0];
        let photoNormal = JSON.stringify(this.normalFileList);
        let { categoryName } = this.categoryArr.find((category) => category.category === this.photoCategory);
        return {
          photoTitle: this.photoTitle,
          photoAvatar: this.userName,
          photoDesc: this.photoDesc,
          photoNormal: photoNormal,
          photoCover: photoCover,
          photoCategory: this.photoCategory,
          photoCategoryName: categoryName,
          userId: this.userId
        }
      },
      handleUploadFile(response){
        const { data: [ resizeFile, normalFile ] } = response;
        this.resizeFileList.push(resizeFile);
        this.normalFileList.push(normalFile);
      },
      handleRemove(file){
        const { response: { data: [ resizeFile, normalFile ] } } = file;
        let resizeIndex = this.resizeFileList.findIndex((file)=> file === resizeFile );
        let normalIndex = this.normalFileList.findIndex((file)=> file === normalFile );
        this.resizeFileList.splice(resizeFile, 1);
        this.normalFileList.splice(normalFile, 1);
      },
      handleClose(){
        this.dialogVisible = false;
        this.$refs.upload.clearFiles();
        this.photoTitle = '';
        this.photoDesc = '';
        this.resizeFileList = [];
        this.normalFileList = [];
        this.photoCategory = [];
      },
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
