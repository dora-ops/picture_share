<template>
  <div class="mi-dialog-container" v-show="visible">
    <div v-if="modal" class="mi-modal" @click="handleClose"></div>
      <div class="mi-dialog-main" :class="customClass">
        <div class="mi-dialog-header">
          <div class="material-icons mi-dialog-close" v-if="showClose" @click="handleClose">close</div>
        </div>
        <div class="mi-dialog-body">
          <slot name="body"></slot>
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
        type: String
      }
    },
    methods: {
      handleClose(){
        this.$emit('update:visible', false);
      }
    },
  }
</script>

