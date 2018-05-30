<template>
  <div class="container">
    <min-menu></min-menu>
    
    <mi-dialog :visible.sync="dialogVisible" customClass="index-dialog" @onClose="clearFileList">
      <div slot="body" class="dialog-body">
        <div class="dialog-left">
          <ul class="dialog-fileList">
            <li v-for="file in fileList" :key="file.id" class="dialog-upload" @click="changeFile(file.id)" :class="[ file.id === activeIndex ? 'active-file' : '']">
              <img :src="file.resizeSrc" alt="">
            </li>
            <mi-upload class="dialog-upload" :meta="{type: 'file', userId: userId}" :afterUpload="handleUpload" :multiple="true">
              <div class="material-icons dialog-icon">add</div>
            </mi-upload>
          </ul>
        </div>
        <div class="dialog-right">
          <button class="btn dialog-btn" @click="releasePhoto">发布</button>
          <div class="dialog-group">
            <label class="dialog-label">作品标题</label>
            <input class="dialog-input" type="text" v-model="photoTitle">
          </div>
          <div class="dialog-group">
            <label class="dialog-label">作品描述</label>
            <textarea class="dialog-input" v-model="photoDesc"></textarea>
          </div>
        </div>
      </div>
    </mi-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
import menu from '../components/menu';
import api from '../plugin/axios';
import { mapState } from "vuex";

  export default {
    name: 'index',
    components: {
      'min-menu': menu
    },
    data(){
      return{
        fileList: [],
        activeIndex: 1,
        photoTitle: '',
        photoDesc: '',
      }
    },
    computed: {
      ...mapState({
        userId: state => state.user.userId,
        userName: state => state.user.userName,
        visible: state => state.dialogVisible
      }),
      dialogVisible: {
        get(){
          return this.visible;
        },
        set(val){
          this.$store.commit('TOOGLE_DIALOG', val)
        }
      },
    },
    methods: {
      async getUserInfo(){
        const data = await api.getUserinfo({ params: { id: this.userId }});
        const { data: { data: { userName, userAvatar } } } = data;
        this.$store.commit('SET_USERINFO', { userName, userAvatar });
      },
      handleUpload(data){
        const { data: { data: dataSrc } } = data;
        const file = {};
        file.id = this.fileList.length + 1;
        file.resizeSrc = dataSrc.find(src => src.includes('resize'));
        file.normalSrc = dataSrc.find(src => src.includes('normal'))
        file.photoDesc = '';
        this.fileList.push(file);
      },
      changeFile(id){
        this.activeIndex = id; 
      },
      async releasePhoto(){
        const photoCover = this.fileList.find(file => file.id === this.activeIndex);
        const photoNormal = this.fileList.map( file => file.normalSrc);
        const releaseData = await api.postRelease({
          data: {
            photoTitle: this.photoTitle,
            photoAvatar: this.userName,
            photoDesc: this.photoDesc,
            photoNormal: photoNormal,
            photoCover: photoCover.resizeSrc,
            userId: this.userId
          }
        })
        const { data: { status, message } } = releaseData;
        if(status === 466){
          this.$message({ message, type: 'error', onClose: this.refreshRoute});
        }else{
          this.$message({ message, type: 'info', onClose: this.refreshRoute});
          this.dialogVisible = false;
        }
      },
      refreshRoute(){
        this.$router.go(0);
      },
      clearFileList(){
        this.fileList = [];
      },
      routeUserHome(){
        this.$router.push({name: 'home', params: { 'id': this.userId }});
      }
    },
    created(){
      this.getUserInfo();
    }
  }
</script>

<style lang="scss">
  .active-file{
    border: 2px solid #e64c65 !important;
  }
  .index-dialog{
    width: 1000px;
    height: 500px;
    overflow-y: auto;
  }
  .dialog-body{
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
  }
  .dialog-left{
    width: 600px;
    & .dialog-fileList{
      display: flex;
      flex-wrap: wrap;
    }
    & .dialog-upload{
      width: 180px;
      height: 120px;
      border: 1px dashed #000000;
      position: relative;
      cursor: pointer;
      margin-right: 15px;
      margin-bottom: 15px;
      & img{
        width: 100%;
        height: 100%;
      }
    }
    & .dialog-icon{
      font-size: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .dialog-right{
    width: 270px;
    & .dialog-btn{
      width: 100%;
    }
    & .dialog-group{
      margin-top: 15px;
      & .dialog-label{
        display: block;
        text-align: left;
      }
      & .dialog-input{
        width: 100%;
        margin-top: 15px;
      }
      & textarea{
        min-height: 200px;
        resize: vertical;
        padding: 8px 8px;
      }
      & input{
        line-height: 30px;
        padding: 0 8px;
      }
    }
  }
</style>
