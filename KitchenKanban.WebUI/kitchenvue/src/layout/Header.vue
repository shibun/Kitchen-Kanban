<template>
<header class="header">
    <h2>Kitchen-Kanban</h2>
     <div id="nav"  v-if="isLoggedIn">
      <router-link to="/">Home</router-link> |
      <router-link to="/menu">Menu</router-link> |
      <router-link to="/about">About</router-link>
      <span> | <a @click="logout">Logout</a></span>
    </div>
</header>
</template>
<script>
export default {
    name:"Header",
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
}
</script>
<style scoped>
.header{
    background-color: black;
    color: blanchedalmond;
    text-align: center;
}
</style>