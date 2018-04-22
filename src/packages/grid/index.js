import Grid from './src/grid.vue';

Grid.install = function(vue){
  Grid.component(Grid.name, Grid);
}

export default Grid;