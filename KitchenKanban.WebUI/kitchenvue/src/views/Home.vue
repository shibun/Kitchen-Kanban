<template>
  <div class="banner">
    <h1>Welcome to Kitchen Kanban</h1>
  </div>
</template>

<script>
import TestService from '../services/testService'
import store from '../store/store'
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
          console.log(response.data),
          //console.log(store.getters.testData.name),
          console.log(store.getters.loggedUser)
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