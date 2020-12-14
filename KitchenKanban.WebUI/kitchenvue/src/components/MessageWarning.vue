<template>
    <div v-if="msgWarning">
        <div class="overlay">
        <div class="pop-overlay">
            <div class="confirm-header">
                <img src="../assets/images/error.png" />
            </div>
            <div class="text-center pop-header">Confirm!</div>
            <div class="text-center">
                <div>{{msgWarning}}</div>
                <div class="top20" v-if="!hideCheck">
                    <label><input class="confirm-check"  v-model="warningCheck" type="checkbox" @change="onWarningChange" /> Don't show this message again</label>
                </div>
            </div>
            <div class="text-center">
                <button class="no-btn"  @click="onReturn">No</button>
                <button class="success-btn"  @click="onContinue">Yes</button>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    name:'MessageWarning',
    props:['msgWarning','hideCheck'],
    data(){
        return{
        warningCheck:false
        }
    },
    methods:{
        onContinue(){
            this.$emit('on-continue-warning')
        },
        onReturn(){
            this.$emit('update:msgWarning','')
        },
        onWarningChange(){
            console.log(this.warningCheck);
            if(this.warningCheck){
                localStorage.setItem('kitchenvuewarning', false)
            }
        }
    }
}
</script>
<style scoped>
.confirm-header {
    background-color: #a27a36;
    text-align: center;
    padding: 20px 0px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.no-btn {
    background-color: #cecece;
    border: 0px;
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 10px 20px;
    border-radius: 4px;
    color: #000;
    margin-right: 30px;
}

.top20
{
    margin-top:20px;
}

.confirm-check
{
    position:relative;
    top:2px;
}
</style>