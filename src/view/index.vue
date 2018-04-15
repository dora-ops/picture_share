<template>
  <div class="container">

  </div>
</template>

<script>
import api from '../plugin/axios';

  export default {
    name: 'index',
    async mounted(){
      const data = await api.getIndex();
    }
  }
</script>
