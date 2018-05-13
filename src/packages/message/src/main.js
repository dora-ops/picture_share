import Vue from 'vue';
import Main from './message.vue';
const MessageBox = Vue.extend(Main);

const Message = function(options = {}){
  if(typeof options === 'string'){
    options = {
      message: options
    }
  }
  const instance = new MessageBox({
    data: options
  })

  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;

  return instance.vm;
}

export default Message;