<template>
<div>
<div class="overlay">
<div class="pop-overlay">
            <div class="success-header">
                <img src="../assets/images/success.png" />
            </div>
            <div class="text-center pop-header">Great!</div>
            <div class="text-center">{{msg}}</div>
            <div class="text-center">
                <button class="success-btn" @click="onContinue">Continue</button>
            </div>
        </div>
</div>
</div>
</template>
<script>
export default {
  name: 'MessageSuccess',
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

