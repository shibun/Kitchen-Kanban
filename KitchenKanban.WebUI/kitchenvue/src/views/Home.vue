<template>
  <div class="banner">
    <h1>Welcome to Kitchen Kanban</h1>
  </div>
</template>

<script>
import TestService from '../services/testService'
export default {
  name: 'Home',
  components: {
  },
   created() {
   this.getProducts()
  },
    methods:{ 
      getProducts () {
          TestService.get().then(response =>  
          console.log(response.data)
          )
        },
  }
}
</script>
<style scoped>
.banner{
  text-align: center;
  color: crimson;

}
</style>