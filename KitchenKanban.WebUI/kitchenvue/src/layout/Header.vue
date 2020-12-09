<template>
<div>
   <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">My Kitchen</router-link>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li><a><img class="user-img" src="../assets/images/user_img.png"/> Pramod Karkera</a></li>
                <li><a href="" @click="logout" ><i class="glyphicon glyphicon-log-out"></i></a></li>
            </ul>
        </div>
    </nav>

     <div>
        <aside>
            <ul class="nav-menu-ul">
                <li><router-link to="/">Dashboard</router-link></li>
                <li><router-link to="/user">User List</router-link></li>
                <li><router-link to="/kitchencounterlist">Kitchen Counter List</router-link></li>
                <li><router-link to="/itemsList">Item List</router-link></li>
                <li> <router-link to="/about">About</router-link></li>
                <li><router-link to="/reports">Reports</router-link></li>
            </ul>
        </aside>
        <div class="clearfix"></div>
    </div>
    </div>
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
</style>