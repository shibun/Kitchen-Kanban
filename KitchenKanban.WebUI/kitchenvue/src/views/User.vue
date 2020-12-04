<template>
    <div>
<section>
         <div class="breadcrumb">User List</div>
            <div class="list-sec">
                <div class="text-right">
                    <button class="trans-btn" data-toggle="modal" data-target="#addUser">
                        <img src="../assets/../assets/images/add.png" />
                    </button>
                </div>
                <table class="custom-tbl">
                    <tbody>
                        <tr>
                            <th class="text-center">Sl No</th>
                            <th class="text-center">User Image</th>
                            <th class="text-center">User Name</th>
                            <th class="text-center">User Id</th>
                            <th class="text-center">User Type</th>
                            <th class="text-center">Edit</th>
                            <th class="text-center">Delete</th>
                        </tr>
                        <tr v-bind:key="user.userId" v-for="(user,index) in users">
                            <td class="text-center">{{index+1}}</td>
                            <td class="text-center"><img src="../assets/images/user_img.png" /></td>
                            <td>{{user.firstName}} {{user.lastName}}</td>
                            <td>{{user.userName}}</td>
                            <td>{{user.userType}}</td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/edit.png" /></button>
                            </td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/delete.png" /></button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
             </section>
               <div class="clearfix"></div>


       <div id="addUser" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add User</h4>
                </div>
                <div class="modal-body">
                    <form >
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>First Name <span class="asterisk">*</span></label>
                                        <input v-model="user.FirstName" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Last Name <span class="asterisk">*</span></label>
                                        <input v-model="user.LastName" type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>User Type <span class="asterisk">*</span></label>
                                        <select class="form-control" v-model="user.UserType">
                                             <option disabled value="">--select--</option>
                                             <option v-bind:key="index" v-for="(item,index ) in userTypes" v-bind:value="item.id">{{item.value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-6">

                                      <div class="form-group">
                                        <label>User Name <span class="asterisk">*</span></label>
                                        <input v-model="user.UserName" type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                             <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Password<span class="asterisk">*</span></label>
                                        <input v-model="user.Password" type="password" class="form-control">
                                    </div>
                                </div>
                                <div class="col-xs-6">

                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>User Image</label>
                                        <img src="../assets/images/no_user_img.png" />
                                    </div>
                                </div>
                                <div class="col-xs-8">
                                    <button class="user-img-upload-btn">Upload</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default left-btn" data-dismiss="modal">Cancel</button>
                    <button type="submit"  @click="addUser" class="btn btn-active" data-dismiss="modal">Add</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import userService from '../services/userService'
//import appDataMixin from '../mixins/appDataMixin'
export default {
    name: 'User',
    //mixins:[appDataMixin],
    data(){
       return {
           users:[],
           userTypes:[{id:1,value:'Administrator'},{id:2,value:'FrontDesk'},{id:3,value:'Chef'},{id:4,value:'BackOffice'},{id:5,value:'Service'}],
           user:{
               UserId:'',
               FirstName:'',
               LastName:'',
               UserName:'',
               UserType:'',
               Password:''
           }
       }
    },
  components: {
  },
   created() {
        this.getUsers()
        //this.userTypes=this.$data
  },
    methods:{ 
      getUsers () {
          userService.getUsers().then(response =>
            this.users=response.data,
            console.log("mixin data",this.$data)
            //console.log('users',response.data),           
          )
        },
      addUser(){
          console.log(this.user);
           userService.addUser(this.user).then(response =>
            console.log(response.data),         
          )
      }
  }
}
</script>