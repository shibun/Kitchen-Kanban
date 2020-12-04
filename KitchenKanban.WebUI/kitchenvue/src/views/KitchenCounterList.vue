<template>
<div>
<section>
            <div class="breadcrumb">Kitchen Counter List</div>
            <div class="list-sec">
                <div class="text-right">
                    <button class="trans-btn" data-toggle="modal" data-target="#addKitchenCounter">
                        <img src="../assets/images/add.png" />
                    </button>
                </div>
                <table class="custom-tbl" >
                    <tbody>
                        <tr >
                            <th class="text-center">Sl No</th>
                            <th class="text-center">Counter Name</th>                           
                            <th class="text-center">Edit</th>
                            <th class="text-center">Delete</th>
                        </tr>
                        <tr v-for ="(data,index) in KCounters" :key="data.KitchenId" v-show="KCounters.length>0">
                            <td class="text-center">{{index+1}}</td>
                            <td>{{data.counterNumber}}</td>
                           
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/edit.png" /></button>
                            </td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/delete.png" /></button>
                            </td>
                        </tr>
                        <tr v-if="showkcounters">
                        No Records Found
                        </tr>
                       
                       
                       
                    </tbody>
                </table>
            </div>
        </section>
  <div class="clearfix"></div>
 <div id="addKitchenCounter" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Kitchen Counter</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Kitchen Counter Name <span class="asterisk">*</span></label>
                                        <input type="text" class="form-control" v-model="KCounterNumber">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default left-btn" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-active" data-dismiss="modal" @click="addKCounter">Add</button>
                </div>
            </div>
        </div>
    </div>
       <MessageSuccess v-if="counteradded" :msg="successmsg"/>
       <MessageError v-if="erroroccured" :msg="errormsg"/>
</div>
</template>
<script>
import KitchenCounterService from '../services/KitchenCounterService'
import MessageSuccess from '@/components/MessageSuccess.vue'
import MessageError from '@/components/MessageError.vue'
    export default {
        name:'KitchenCounterService',
          created() {
   this.getKitchenCounters()
  },
        data() {
            return {
              KCounterNumber:"",
              KCounters:[],
              showkcounters:false,
              counteradded:false,
              erroroccured:false,
              successmsg:"",
              errormsg:""
            }
        },
          components: {
        MessageSuccess,
        MessageError

             },
        methods: {
               getKitchenCounters () {
          KitchenCounterService.get().then(response =>

          {
              if(response.data.length>0){
                    this.showkcounters=false
                     this.KCounters=response.data
                }
                else
                {
                    this.showkcounters=true
                }
          }
         
         // console.log('kitchen counters',response.data)            
         
          )
        },
        addKCounter:function(){
            KitchenCounterService.post(this.KCounterNumber).then(response=>
                    {               
                        this.counteradded=true,
                        this.successmsg="Counter added",
                        console.log('Kitchen counter added',response.data)
                        // this.$router.go() 

                    }       
            )
            .catch(err=>{
                this.errormsg=err.messge,
                this.erroroccured=true,
                console.log(err.message)
            })
        }
    }
}
    
</script>