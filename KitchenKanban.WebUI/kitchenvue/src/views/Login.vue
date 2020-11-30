<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User Name</label>
     <input required v-model="Username" placeholder="Username"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>
<script>
  export default {
    data(){
      return {
        Username : "",
        password : ""
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