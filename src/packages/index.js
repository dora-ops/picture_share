import Vue from 'vue';
import Grid from './grid/index';
import Upload from './upload/index';
import Dialog from './dialog/index';

const components = [
  Grid,
  Upload,
  Dialog,
]

const install = components.map(component=>{
  Vue.component(component.name, component);
})

export default { install };