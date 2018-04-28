import Vue from 'vue';
import Grid from './grid/index';
import Upload from './upload/index';
import Dialog from './dialog/index';
import Crop from './crop/index';

const components = [
  Grid,
  Upload,
  Dialog,
  Crop
]

const install = components.map(component=>{
  Vue.component(component.name, component);
})

export default { install };