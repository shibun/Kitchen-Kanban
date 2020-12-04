<template>
  <div class="banner">
    <h1>Welcome to Kitchen Kanban</h1>
  </div>
</template>

<script>
import testService from '../services/testService'
import store from '../store/store'
//import axios from 'axios';
export default {
  name: 'Home',
  components: {
  },
 
   created() {
   this.getProducts()
  },
    methods:{ 
      getProducts () {
          testService.get().then(response =>
          console.log('response',response.data),
          //console.log(store.getters.testData.name),
          console.log('loogedin user',store.getters.loggedUser)              
         
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