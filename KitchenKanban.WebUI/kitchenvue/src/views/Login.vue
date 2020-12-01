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
     <h2> enter username and password</h2>
   </form>
 </div>
</template>
<script>
  export default {
    data(){
      return {
        Username : "admin",
        password : "123456"
      }
    },
     methods: {
      login: function () {
        let Username = this.Username
        let password = this.password
        this.$store.dispatch('login', { Username, password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
  }
</script>