<template>
  <div id="app">
    <Header v-if="isLoggedIn"/>
    <router-view />
  </div>
</template>
<script>
import Header from "./layout/Header";
import axios from 'axios';


export default {
  name:"app",
   computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
  components:{
    Header
  },
   created:function () {
     let ax=this.$store;
     let rt=this.$router;
        axios.interceptors.response.use((response) => {
                return response;
              }, 
              function (error) {
                  // Do something with 
                   console.log(error.message);
                  if (error.response.status === 401) {
                      console.log('unauthorized, logging out ...');
                      ax.dispatch('logout')
                      rt.push('/login')
                  }
                  if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
                      ax.dispatch('logout')
                    }
                  return Promise.reject(error.response);
      });
   }
}
</script>