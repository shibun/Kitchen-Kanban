<template>
<div>
   <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">My Kitchen</router-link>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li><a>
                <img class="user-img" src="../assets/images/user_img.png" v-if="!usrImage"/> 
                   <img v-bind:src="'data:image/jpeg;base64,'+ usrImage" v-if="usrImage" class="display-user-img"/>
                
                 {{loggedUser && loggedUser.userFullName}}</a></li>
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
                <li><router-link to="/reports">Reports</router-link></li>
            </ul>
        </aside>
        <div class="clearfix"></div>
    </div>
    </div>
</template>
<script>
import userService from '../services/userService'
export default {
    name:"Header",
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
      loggedUser : function(){ return this.$store.getters.loggedUser},
    },
    data(){
      return {
        usrImage:''
      }
    },
    created (){
      console.log('loggedUser',this.loggedUser);
      this.getUserDetails()
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      },
      getUserDetails(){
        if(this.isLoggedIn && this.loggedUser){
           userService
            .getUser(this.loggedUser.userId)
              .then((response) => {
                this.usrImage=response.data.imageContent;
                //console.log('img',response.data.imageContent);
            })
            .catch((err) => {
              (this.errormsg = err.messge), console.log(err.message);
            });
        }
      }
    }
}
</script>