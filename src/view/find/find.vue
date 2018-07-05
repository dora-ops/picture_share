<template>
  <div class="find-container">
    <nav class="find-nav">
      <router-link tag="li" v-for="(find, index) in findList" :key="index" :to="{name: 'findList', params: { type: find.findType}}" exact-active-class="find-active">
      {{find.findName}}
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import { findList } from '../../config/config.js';
  export default {
    name: 'find',
    data(){
      return {
        findList: findList
      }
    },
    created(){
      this.$router.push({name: 'findList', params: { type: 'new' }})
    }
  }
</script>

<style lang="scss">
  .find-active{
    color: #5db0c6;
  }
  .find-nav{
    display: flex;
    list-style: none;
    height: 60px;
    line-height: 60px;
    background: #ffffff;
    justify-content: center;
    & li {
      padding: 0 30px;
      cursor: pointer;
    }
  }
</style>
