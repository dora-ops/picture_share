<template>
  <div class="container">
    <min-menu></min-menu>
    <mi-dialog :visible.sync="dialogVisible" customClass="index-dialog">
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
          <div class="dialog-desc">
            <label>作品描述</label>
            <textarea v-model="desc"></textarea>
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
        desc: '',
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
    watch: {
      activeIndex(val, oldVal){
        const prevFile = this.fileList.find(file => file.id === oldVal);
        const nextFile = this.fileList.find(file => file.id === val);
        prevFile.desc = this.desc;
        this.desc = nextFile.desc;
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
        file.desc = '';
        this.fileList.push(file);
      },
      changeFile(id){
        this.activeIndex = id; 
      },
      releasePhoto(){
        const targetFile = this.fileList.find(file => file.id === this.activeIndex);
        targetFile.desc = this.desc;
        const promiseList = this.fileList.map( async file => {
          const data = await api.postReleasePhoto({
            data: { 
              content: file.normalSrc,
              resizeContent: file.resizeSrc,
              desc: file.desc,
              userId: this.userId
            }
          })
          return data;
        })
        for(let promise of promiseList){
          promise.then((result) => {
            const { data: { status, message } } = result;
            if(status === 466){
              this.$message({
                message: message,
                type: 'error',
              })
            }else{
              this.$message({
                message: message,
                type: 'info'
              })
            }
          })
        }
        this.fileList = [];
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
    height: 400px;
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
    & .dialog-desc{
      margin-top: 30px;
      & label{
        display: block;
        text-align: left;
        margin-bottom: 15px;
      }
      & textarea{
        width: 100%;
        min-height: 200px;
        resize: vertical;
        padding: 8px 8px;
      }
    }
  }
</style>
