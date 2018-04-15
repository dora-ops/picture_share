<template>
  <div class="register-container">
    <form class="register-form" @submit.prevent="onRegister">
      <h4 class="register-title">爱吃</h4>
      <p class="register-desc">分享各地的美食</p>
      <p class="register-error" v-show="valid">{{errorMsg}}</p>
      <input class="register-input" type="email" placeholder="邮箱" v-model="userEmail">
      <input class="register-input" type="text" placeholder="用户名" v-model="userName">
      <input class="register-input" type="password" placeholder="密码" v-model="userPassword">
      <button class="register-button" type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import validators from '../plugin/valid';
import api from '../plugin/axios';

  export default {
    name: 'register',
    data(){
      return {
        userEmail: '',
        userName: '',
        userPassword: '',
        errorMsg: ''
      }
    },
    computed: {
      valid(){
        return this.errorMsg ? true : false;
      }
    },
    methods: {
      validRule(email, userName, userPassword){
        const validator = validators();
        validator.add(email, [{
          name: 'isEmail',
          error: '邮箱格式不正确',
        }])
        validator.add(userName, [{
          name: 'isNull',
          error: '用户名不能为空'
        }])

        validator.add(userPassword, [{
          name: 'isPattern',
          allowed: /^(\w){6,}$/,
          error: '密码不能少于6个字符'
        }])

        this.errorMsg = validator.run();

        return this.errorMsg ? false : true;
      },
      async uniqueEmail(){
        try {
          const { userEmail, userName, userPassword} = this.$data;
          const data = await api.getRegisterUnique({'email': userEmail});
          const { data: { code, message } } = data;  
          if(code !== 200){
            this.errorMsg = message
            return;   
          }
          await this.postUser({ userEmail, userName, userPassword});
        } catch (error) {
          console.log(123);
        } 
      },
      async postUser(data){
        const isRegister = await api.postRegister(data);
        const { data: { code } } = isRegister;
        code === 200 ? this.$router.push({name: 'login'}) : this.$router.push({name: 'index'});
      },
      onRegister(){
        const { userEmail, userName, userPassword } = this.$data;
        const flag = this.validRule(userEmail, userName, userPassword)
        if(flag) { this.uniqueEmail() };
      }
    }
  }  
</script>

<style lang="scss">
  .register-container{
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: #263238;
  }
  .register-form{
    width: 400px;
    padding: 30px 15px;
    text-align: center;
    background: #ffffff;
    border-radius: 5px;
  }
  .register-title{
    color: #03A9F4;
    font-size: 20px;
    letter-spacing: 5px;
  }
  .register-desc{
    color: #78909c;
    margin: 15px 0;
  }
  .register-error{
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-bottom: 15px;
    font-size: 14px;
    color: #ea6f5a;
  }
  .register-input{
    width: 70%;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding-left: 8px;
    margin-bottom: 15px;
    border: 1px solid #c8c8c8;
    border-radius: 3px;
  }
  .register-tip{
    display: inline-block;
    width: 70%;
    font-size: 14px;
    margin-bottom: 15px;
    cursor: pointer;
    text-align: right;
    color: #78909c;
  }
  .register-button{
    width: 70%;
    height: 30px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    background: #3db922;
    color: #ffffff;
    outline: none;
  }
</style>
