<template>
<div v-if="msg">
  <div class="overlay">
    <div class="success-overlay">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
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
            setTimeout(() => this.$emit("on-success"), 
            1000);
        }
      }
    }
  }
}
</script>

