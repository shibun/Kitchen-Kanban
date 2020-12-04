<template>
<div>
    <div class="overlay">
        <div class="pop-overlay">
                    <div class="error-header">
                        <img src="../assets/images/error.png" />
                    </div>
                    <div class="text-center pop-header">Error!</div>
                    <div class="text-center">{{msg}}</div>
                    <div class="text-center">
                        <button class="error-btn" @click="onContinue">Continue</button>
                    </div>
            </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'MessageError',
  props: {
    msg: String
  },
  methods:{
    onContinue:function(){
      this.$router.go()
    }
  }
}
</script>

