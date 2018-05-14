<template>
  <transition name=custame :enter-to-class="enterClass">
    <div class="mi-message" v-show="visible" :class="[`mi-message-${typeClass}`]" :style="[textCenter]">
      <p class="mi-message-text">{{message}}</p>
    </div>
  </transition>
</template>

<script>
  const typeMap = {
    info: 'info',
    success: 'success',
    warn: 'warning',
    error: 'error',
  }

  export default {
    name: 'MiMessage',
    data(){
      return {
        message: '',
        visible: false,
        type: 'default',
        duration: 3000,
        timer: null,
        center: false,
        enterClass: '',
        leaveClass: ''
      }
    },
    computed: {
      typeClass(){
        const type = Object.keys(typeMap).some(type => type == this.type);
        const typeClass = type ? typeMap[this.type] : 'default';
        return typeClass;
      },
      textCenter(){
        let ret = {};
        if(this.center){
          ret.textAlign = 'center';
        }
        return ret;
      }
    },
    watch: {
      visible(val){
        if(val){
          this.startTimer();
        }
      }
    },
    methods: {
      startTimer(){
        this.timer = setTimeout(()=>{
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyMessage);
        }, this.duration);
      },
      destroyMessage(){
        this.$el.removeEventListener('transitionend', this.destroyMessage);
        document.body.removeChild(this.$el);
        this.$destroy(this.$el);
      }
    },
  }
</script>
