<template>
 <div class="login-sec">
        <div class="login-flex">
            <div class="login-left-sec">
                <div class="welcome-text">Welcome to My Kitchen</div>
                <p class="welcome-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
            </div>
            <div class="login-right-sec">
                <h3 class="login-header">Login</h3>
                <form class="top50 bottom50" @submit.prevent="login">
                    <div class="form-group">
                        <label>User Name</label>
                        <input type="text" class="form-control" v-model="Username">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="password">
                    </div>
                    <div class="text-center">
                        <button class="login-btn" type="submit">Login</button>
                         <div v-if="!loginsuccess"><span>Username or password is wrong</span></div>
                    </div>
                </form>
            </div>
        </div>
        <div class="clearfix"></div>
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