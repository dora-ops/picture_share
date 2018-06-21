<template>
  <section class="profile-container">
    <h2 class="profile-title">基本信息</h2>
    <div class="profile-content">
      <div class="profile-user">
        <label for="username">昵称</label>
        <input class="profile-input" type="text" v-model="userProfile.userName" name="username">
        <label for="userdesc">简介</label>
        <input class="profile-input" type="text" v-model="userProfile.userDesc" name="userdesc">
        <button class="btn profile-btn" @click="handleSave">保存</button>
      </div>
      <div class="profile-avatar">
        <div class="profile-avatar-img"> 
          <img :src="userProfile.userAvatar" alt="">
        </div>
        <el-upload ref='upload' action="http://139.199.230.46:3000/upload" :data="{type: 'avatar', userId: userId}" :headers="{Authorization:`Bearer ${userToken}`}" accept=".jpg, .jpeg" :on-success="handleResponse">
          <button class="btn">更换图像</button>
        </el-upload>
      </div>
    </div>
  </section>  
</template>

<script>
import { mapState }from 'vuex';
import api from '../../plugin/axios';
import { uniqueName } from '../../API/register.js'
import { getUserProfile, saveUserProfile} from '../../API/profile.js';

export default {
  name: 'profile',
  data(){
    return {
      userProfile: {
        userName: '',
        userAvatar: '',
        userDesc: '',
      },
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
      userToken: state => state.useruserToken
    })
  },
  methods: {
    async getUserProfile(id){
      const userProfile = await getUserProfile(id);
      this.userProfile = userProfile;
    },
    handleResponse(data){
      const { data: { data: dataSrc }} = data;
      this.userProfile.userAvatar = dataSrc[0];
    },
    async handleSave(){
      const uniqueMessage = await uniqueName(this.userProfile.userName);
      if(uniqueMessage){
        this.$message({type: 'error', message: uniqueMessage, center: true});
        return; 
      }
      const resData = await saveUserProfile(this.userId, this.userProfile);
      this.$message({type: resData.type, message: resData.message, center: true});
      if(resData.status !== 466){
        this.$store.commit('SET_USERINFO', this.userProfile);
      }
    },
  },
  created(){
    this.getUserProfile(this.userId);
  }
}

</script>

<style lang="scss">
  .profile-container{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    padding: 15px 30px;
    height: auto;
    background: #ffffff;
  }
  .profile-content{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .profile-user{
    width: 300px;
    .profile-input{
      display: block;
      margin-top: 15px;
      width: 100%;
      height: 30px;
      line-height: 30px;
      outline: 0;
      padding-left: 8px;
      margin-bottom: 15px;
      border: 1px solid #c8c8c8;
      border-radius: 3px;
    }
    .profile-btn{
      width: 100px;
      border-radius: 25px;
      background: #039BE5;
      color: #ffffff; 
    }
  }
  .profile-avatar{
    width: 100px;
    & img{
      display: block;
      width: 100%;
      height: 100px;
      margin-bottom: 30px;
      border-radius: 50%;
    }
    & button{
      width: 100%;
      background: #039BE5;
      color: #ffffff;
    }
  }
</style>

