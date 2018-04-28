import Grid from './src/grid.vue';

Grid.install = function(vue){
  vue.component(Grid.name, Grid);
}

export default Grid;