<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="onLogin">
      <h4 class="login-title">极简</h4>
      <p class="login-desc">记录生活的美好</p>
      <p class="login-error" v-show="valid">{{errorMsg}}</p>
      <input class="login-input" type="email" placeholder="邮箱" v-model="userEmail">
      <input class="login-input" type="password" placeholder="密码" v-model="userPassword">
      <div class="login-tip">
        <router-link to="/register" tag="span">还未注册</router-link>
      </div>
      <button class="login-button" type="submit">登陆</button>
    </form>
  </div>
</template>

<script>
import api from '../plugin/axios';
import validators from '../plugin/valid';
import { setTokenToLocalStroage } from '../util/auth';

  export default {
    name: 'Login',
    middleware: 'noauth',
    data(){
      return {
        userEmail: '',
        userPassword: '',
        errorMsg: '',
      }
    },
    computed: {
      valid(){
        return this.errorMsg ? true : false;
      }
    },
    methods: {
      validRule(email, password){
         const validator = validators();
         validator.add(email, [{
          name: 'isEmail',
          error: '邮箱格式不正确',
        }])

        validator.add(password, [{
          name: 'isPattern',
          allowed: /^(\w){6,}$/,
          error: '密码不能少于6个字符'
        }])

        this.errorMsg = validator.run();

        return this.errorMsg ? false : true;
      },
      async postLogin(userInfo){
        const loginData = await api.postLogin({ data: userInfo });
        const { data: { status, message, data: { token, id } } } = loginData;
        if( status === 466){
          this.errorMsg = message;
          return;
        }
        // 设置token
        setTokenToLocalStroage(token, id)
        // vuex设置user状态 
        this.$store.commit('LOGIN_IN', {token, id});
        // 跳转主页
        this.$router.push({name: 'index'})
      },
      onLogin(){
        const { userEmail, userPassword } = this.$data;
        const flag = this.validRule(userEmail, userPassword);
        if(flag) { this.postLogin({ userEmail, userPassword }) }; 
      }
    }
  }  
</script>

<style lang="scss">
  .login-container{
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: #263238;
  }
  .login-form{
    width: 400px;
    padding: 30px 15px;
    text-align: center;
    background: #ffffff;
    border-radius: 5px;
  }
  .login-title{
    color: #03A9F4;
    font-size: 20px;
    letter-spacing: 5px;
  }
  .login-desc{
    color: #78909c;
    margin: 15px 0;
  }
  .login-error{
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-bottom: 15px;
    font-size: 14px;
    color: #ea6f5a;
  }
  .login-input{
    width: 70%;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding-left: 8px;
    margin-bottom: 15px;
    border: 1px solid #c8c8c8;
    border-radius: 3px;
  }
  .login-tip{
    display: inline-block;
    width: 70%;
    font-size: 14px;
    margin-bottom: 15px;
    cursor: pointer;
    text-align: right;
    color: #78909c;
  }
  .login-button{
    width: 70%;
    height: 30px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    background: #039BE5;
    color: #ffffff;
    outline: none;
  }
</style>
