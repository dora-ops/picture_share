import Vue from 'vue';
import Dialog from './dialog/index';
import Message from './message/index';
import MessageBox from './message/src/main';

const components = [
  Dialog,
  Message
]

const install = components.map(component=>{
  Vue.component(component.name, component);
})

Vue.prototype.$message = MessageBox

export default { install };