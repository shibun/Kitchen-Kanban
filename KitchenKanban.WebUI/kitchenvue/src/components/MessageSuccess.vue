<template>
<div v-if="msg">
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
 props:['msg'],
  methods:{
    onContinue:function(){
        this.$emit("on-success");
    }
  },
   watch: {
      msg:{
        immediate: true,
        handler(newVal, oldVal) {
          if(newVal){
            console.log(oldVal,newVal);
            setTimeout(() => this.$emit("on-success"), 2000);
        }
      }
    }
  }
}
</script>

