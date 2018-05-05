<template>
  <div class="card-container" @mouseleave="visible = false" @mouseover="visible = true">
    <div class="card-head">
      <div class="card-head-detail" :class="{active: visible}">
        <span class="material-icons" :class="visible ? 'active' : 'icon-red'">favorite</span>
        <span>{{heatTotal}}</span>
      </div>
      <div class="material-icons circle-green">panorama_fish_eye</div>
    </div>
    <div class="card-content" v-show="visible">
      <p>sdsdsfdsfs</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MinCard',
  data(){
    return {
      visible: false
    }
  },
  props: {
    heatTotal: {
      type: Number,
      default: 0
    }
  },
}

</script>

<style lang="scss">
  .card-container{
    width: 300px;
    height: 200px;
    margin-bottom: 30px;
    cursor: pointer;
    border-radius: 8px;
    background-color: #999999;
    position: relative;
    overflow: hidden;
  }
  .card-head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 15px;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    z-index: 5;
    & &-detail{
      color: #ffffff;
      & span{
        display: inline-block;
        vertical-align: middle;
      }
      &.active{
        color: #b8c3c8;
      }
    }
  }
  .card-content{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #ffffff;
    padding: 75px 30px 0 30px;
    color: #b8c3c8;
  }
</style>

