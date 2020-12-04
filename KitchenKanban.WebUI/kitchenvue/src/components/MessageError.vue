<template>
<div v-if="msg">
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
  props:['msg'],
  data(){
    return {
      hasMessage:false
    }
  },
  methods:{
    onContinue:function(){
      console.log("onContinue called");
     this.$emit("on-error");
    }
  },
  watch: {
      msg:{
        immediate: true,
        handler(newVal, oldVal) {
          if(newVal){
            console.log(oldVal,newVal);
            setTimeout(() => this.$emit("on-error"), 2000);
        }
      }
    }
  }
}
</script>

