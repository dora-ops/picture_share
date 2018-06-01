<template>
  <div class="mi-dialog-container" v-show="visible" @click.self="handleClose">
    <div v-if="modal" class="mi-modal" @click="handleClose"></div>
      <div class="mi-dialog-main" :class="customClass">
        <div class="mi-dialog-header">
          <div class="mi-dialog-close" v-if="showClose" @click="handleClose">
            <i class="fas fa-times"></i>
          </div>
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
      },
    },
    methods: {
      handleClose(){
        this.$emit('update:visible', false);
        this.$emit('onClose');
      }
    },
  }
</script>

