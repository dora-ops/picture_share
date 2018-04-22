import Vue from 'vue';
import Grid from './grid/index';
import Upload from './upload/index';

const components = [
  Grid,
  Upload
]

const install = components.map(component=>{
  Vue.component(component.name, component);
})

export default { install };