<template>
    <div class="add-overlay" v-if="isAddUser">
      <div class="add-pop-overlay">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
             @click="clearForm"
          >
            ×
          </button>
        <h4 class="modal-title">Add User</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="container-fluid">
              <div class="row">
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>First Name <span class="asterisk">*</span></label>
                    <input
                      v-model="user.firstName" autofocus
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>Last Name <span class="asterisk">*</span></label>
                    <input
                      v-model="user.lastName"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>User Type <span class="asterisk">*</span></label>
                    <select class="form-control" v-model="user.userType">
                      <option disabled value="">--select--</option>
                      <option
                        v-bind:key="index"
                        v-for="(item, index) in userTypes"
                        v-bind:value="item.id"
                      >
                        {{ item.value }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>User Name <span class="asterisk">*</span></label>
                    <input
                      v-model="user.userName"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row" v-if="!user.userId">
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>Password <span class="asterisk">*</span></label>
                    <input
                      v-model="user.password"
                      type="password"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-xs-6"></div>
              </div>
              <div class="row">
                <div class="col-xs-4">
                  <div class="form-group">
                    <label>User Image</label>
                     <img src="../assets/images/no_user_img.png" v-if="imagedata==''" class="uploaded-user-img">
                    <img :src="imagedata" v-if="imagedata!=''" class="uploaded-user-img"  />
                  </div>
                </div>
                <div class="col-xs-8">
                 
                   <label class="user-img-upload-btn" >
                     <input type="file" name="file" multiple="" v-on:change="fileChange($event.target.files)"/>
                     Upload
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="clearForm"
            class="btn btn-default left-btn"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button v-if="!user.userId"
            type="submit" id="adduserformbutton"
            @click="addUser"
            class="btn btn-active"
            data-dismiss="modal"
          >
            Add
          </button>
           <button v-if="user.userId"
            type="submit"
            @click="updateUser"
            class="btn btn-active"
            data-dismiss="modal"
          >
            Update
          </button>
        </div>
      </div>
    </div>
</template>
<script>
import userService from "../services/userService";
import Vue from 'vue'
export default {
    name:"AddUser",
    props:['isAddUser','edituser'],
     data() {
    return {
      successmsg: "",
      errormsg: "",
      userTypes: [
        { id: 1, value: "Administrator" },
        { id: 2, value: "FrontDesk" },
        { id: 3, value: "Chef" },
        { id: 4, value: "BackOffice" },
        { id: 5, value: "Service" },
      ],
      user: {
        userId: "",
        firstName: "",
        lastName: "",
        userName: "",
        userType: "",
        password: "",
      },
      imagedata:'',
      files:""
    };
  },
  methods:{
      hideAddUser() {
        this.$emit('clear-add-user');
    },
    addUser(){
         this.$emit("add-user",this.user,this.files);
    },
    updateUser(){
      this.$emit("update-user",this.user,this.files);
    },
    clearForm() {
       this.user = {
        userId: "",
        firstName: "",
        lastName: "",
        userName: "",
        userType: "",
        password: "",
      };
      this.imagedata='';
      this.files="";


      console.log('clearForm',this.user);
      this.hideAddUser();
    },
     fileChange(fileList) {      
      var reader = new FileReader();                
                reader.onload = (e) => {                    
                    this.imagedata = e.target.result;
                }
        reader.readAsDataURL(fileList[0]);
      this.files = new FormData();    
      this.files.append("file", fileList[0], fileList[0].name);
    },
  },
   watch: {


             'edituser'(){
                 
                  //Vue.set(this.user,'user',this.edituser);
                  this.user=this.edituser;
                  console.log('watch',this.edituser);
                 if(this.user.imageContent!=null){
                      //console.log('image is there');
                      this.imagedata='data:image/jpeg;base64,'+this.user.imageContent;
                      }
                      else{
                    //console.log('image is not threse')
                      this.imagedata='';
                  }
               
            },
    //   edituser:{
    //     immediate: true,
    //     deep: true,
    //     handler(newVal, oldVal) {
       
    //         console.log('watch',oldVal,newVal);
    //         this.user=newVal;
    //          if(this.user.imageContent!=null){
    //           //console.log('image is there');
    //           this.imagedata='data:image/jpeg;base64,'+this.user.imageContent;
    //            }
    //           else{
    //          //console.log('image is not threse')
    //           this.imagedata='';
    //        }
       
    //   }
    // }
  }
}
</script>