<template>
  <section class="profile-container">
    <h2 class="profile-title">基本信息</h2>
    <div class="profile-content">
      <div class="profile-user">
        <label for="username">昵称</label>
        <input class="profile-input" type="text" v-model="userProfile.userName" name="username">
        <label for="userdesc">简介</label>
        <input class="profile-input" type="text" v-model="userProfile.desc" name="userdesc">
        <button class="btn profile-btn" @click="handleSave">保存</button>
      </div>
      <div class="profile-avatar">
        <div class="profile-avatar-img">
          <img :src="userProfile.avatar" alt="">
        </div>
        <mi-upload :meta="{ type: 'avatar', userId: userId}" :afterUpload="handleUpload">
          <button class="btn">更换图像</button>
        </mi-upload>
        <button class="btn" @click="handleClick">消息通知</button>
      </div>
    </div>
  </section>  
</template>

<script>
import { mapState }from 'vuex';
import api from '../plugin/axios';

export default {
  name: 'profile',
  data(){
    return {
      userProfile: {
        userName: '',
        avatar: '',
        desc: '',
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId
    })
  },
  methods: {
    async getUserProfile(id){
      const data = await api.getUserProfile({params: { id }});
      const { data: { data: userProfile } } = data;
      this.userProfile = userProfile;
    },
    handleUpload(data){
      const { data: { data: dataSrc }} = data;
      this.userProfile.avatar = dataSrc;
    },
    async handleSave(){
      const data = await api.postUserinfo({ 
        data: { userProfile: this.userProfile, id: this.userId },
        params: { id: this.userId }
      });
      console.log(data);
    },
    handleClick(){
      this.$message({
        message: '保存成功',
        type: 'success',
        center: true,
        enterClass: 'in',
        leaveClass: 'in',
      });
    }
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

