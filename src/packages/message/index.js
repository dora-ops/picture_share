import Message from './src/message.vue';

Message.install = (vue)=>{
  vue.component(Message.name, Message);
}

export default Message;