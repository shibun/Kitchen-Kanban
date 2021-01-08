<template>
  <div class="login-sec">
    <div class="login-flex">
      <div class="login-left-sec">
        <div class="welcome-text">Welcome to My Kitchen</div>        
      </div>
      <div class="login-right-sec">
        <h3 class="login-header">Login</h3>
        <form class="top50 bottom50" @submit.prevent="login">
          <div class="form-group">
            <label>User Name</label>
            <input
              type="text"
              class="form-control"
              v-model="Username"
              id="Username"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              id="Password"
            />
          </div>
          <div class="incorrect_credentials" v-if="!loginsuccess" id="validation1">
              <span>User name or password is incorrect</span>
            </div>
          <div class="text-center">
            <button class="login-btn" type="submit">Login</button>            
          </div>
        </form>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script src="../viewscripts/loginScript.js" type="text/javascript">

</script>
