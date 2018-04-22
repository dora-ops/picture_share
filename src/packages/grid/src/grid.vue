<template>
  <div class="mi-grid" :class="classList" :style="[template, gap]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'MiGrid',
    props: {
      cols: {
        type: Array,
      },
      rows: {
        type: Array,
      },
      repeat: {
        type: Array,
        default: function(){
          return [1,1];
        }
      },
      gaps: {
        type: Array,
        default: function(){
          return [0, 15];
        }
      },
      justifyItem: {
        type: String,
      },
      justifyContent: {
        type: String,
      },
      alignItem: {
        type: String,
      },
      alignContent: {
        type: String,
      }
    },
    computed: {
      template(){
        let ret = {};
        if(this.cols){
          ret.gridTemplateColumns = `repeat(${this.repeat[0]}, ${this.cols.join(" ")})`;
        }
        if(this.rows){
          ret.gridTemplateRows = `repeat(${this.repeat[1]}, ${this.rows.join(" ")})`;
        }
        return ret;
      },
      gap(){
        let ret = {};
        if(this.gaps){
          ret.gridGap = this.gaps.join(' ');
        } 
        return ret;
      },
      classList(){
        let ret = ['justifyItem', 'justifyContent', 'alignItem', 'alignContent']
        .map((prop)=>{
          if(this[prop]){
            return `mi-${prop}-${this[prop]}`;
          }
        })
        return ret;
      }
    }
  }
</script>