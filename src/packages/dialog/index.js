import Dialog from './src/dialog.vue';

Dialog.install = function(vue){
  vue.component(Dialog.name, Dialog);
}

export default Dialog;