<template>
  <div class="mi-dialog-container" v-show="visible">
    <div v-if="modal" class="mi-modal" @click="handleClose"></div>
    <div class="mi-dialog-main">
      <div class="mi-dialog-header">
        <slot name="title">
          <div class="mi-dialog-title">{{title}}</div>
        </slot>
        <button class="mi-dialog-close" @click="handleClose" v-if="showClose">
          <i class="fas fa-times fa-lg"></i>
        </button>
      </div>
      <div class="mi-dialog-body">
        <slot name="body"></slot>
      </div>
      <div class="mi-dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MiDialog',
    props: {
      visible: Boolean,
      title: {
        type: String,
        default: ''
      },
      modal: {
        type: Boolean,
        default: true,
      },
      showClose: {
        type: Boolean,
        default: true
      },
      customClass: {
        type: Array,
        default: function(){
          return [];
        }
      }
    },
    watch: {
      visible(val){
        if(val){
          document.body.appendChild(this.$el);
        }else{
          document.body.removeChild(this.$el);
        }
      }
    },
    methods: {
      handleClose(){
        this.$emit('update:visible', false);
      }
    },
  }
</script>

<style lang="scss">
  .mi-dialog-contaienr{
    position: fixed;
    width: 100%;
    height: 1000vh;
  }
  .mi-modal{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .mi-dialog-main{
    width: 400px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    text-align: center;
  }
  .mi-dialog-header{
    width: 100%;
    padding: 15px 0;
    position: relative;
  }
  .mi-dialog-close{
    position: absolute;
    top: 8px;
    right: 8px;
    color: #d3d3d3;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .mi-dialog-body{
    margin-top: 20px;
  }
  .mi-dialog-footer{
    margin-top: 20px;
  }
</style>
