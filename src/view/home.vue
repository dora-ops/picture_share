<template>
  <section>
    <p>dfsdfsd</p>
  </section>
</template>

<script>
import api from '../plugin/axios.js';

  export default {
    name: 'home',
    data(){
      return {

      }
    },
    methods: {
      async getHomeCover(){
        const data = await api.getHomeCover();
      }
    },
    created(){
      //this.getHomeCover();
    }
  }
</script>
