<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User Name</label>
     <input required v-model="Username" placeholder="Username" id="Username"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password" id="Password"/>
     <hr/>
     <button type="submit">Login</button>
     <div v-if="!loginsuccess" id="validation1"><span>Username or password is wrong</span></div>
 
   </form>
 </div>
</template>
<script>
  export default {
    data(){
      return {
        Username : "",
        password : "",
        loginsuccess:true
      }
    },
     methods: {
      login: function () {
        let Username = this.Username
        let password = this.password
        this.$store.dispatch('login', { Username, password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err),
            console.log("error"),
            this.loginsuccess=false
       )
      }
    }
  }
</script>