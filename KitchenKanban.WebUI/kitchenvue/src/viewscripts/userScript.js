import userService from "../services/userService";
//import appDataMixin from '../mixins/appDataMixin'
import MessageSuccess from "../components/MessageSuccess.vue";
import MessageError from "../components/MessageError.vue";
import AddUser from '../components/AddUser.vue';
import MediarelatedService from '../services/MediarelatedService';
import Vue from "vue";
export default {
  name: "User",
  //mixins:[appDataMixin],
  data() {
    return {
      successmsg: "",
      errormsg: "",
      currentdate:'',
      users: null,
      isAddUser: false,
      isNew:true,
      edituser: {},
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
      files:"",
    };
  },
  components: {
    MessageSuccess,
    MessageError,
    AddUser,
  },
  created() {
    this.getUsers();
    //this.userTypes=this.$data
  },
  mounted: function () {
    setInterval(function () {
      this.getNow()
    }.bind(this), 1000)
  },
  methods: {
    getUsers() {
      this.successmsg = "";
      userService
        .getUsers()
        .then((response) => (this.users = response.data))
        .catch((err) => {
          this.errormsg = err.messge;
          console.log(err.message);
        });
    },
    showAddUser() {
      this.isAddUser = true;
    },
    getNow: function() {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + ' ' + time;
      this.currentdate = dateTime;
    },
     addUser(data,data1) {
       this.files=data1;
       this.errormsg = "";
       if(!data.firstName){
        this.errormsg = "Please enter first name";
         return;
       }
      
      userService
        .addUser(data)
        .then(
          (response) => 
            {
        if(this.files != '')
            {
              const files = this.files;
              MediarelatedService.uploadfile(files, response.data.userId, 1)
                .then((response) => {  
                  this.successmsg = "user added";
                   this.isAddUser = false;          
                  console.log("response", response);
                })
              .catch((err) => {
                (this.errormsg = "error occured"), console.log(err.message);
              });
            }   
            else{
               this.successmsg = "user added";
                   this.isAddUser = false;    
            }
                
    
          }
        )
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    updateUser(data,data1) {
       this.files=data1;
      this.errormsg = "";
      if(!this.validateUser(data,false)){
        return;
      }
      userService
        .updateUser(data)
        .then(
          (response) => {
             if(this.files != '')
            {
              const files = this.files;
              MediarelatedService.uploadfile(files, data.userId, 1)
                .then((response) => {    
                   this.successmsg = "user updated";
                    this.isAddUser = false        
                  console.log("response", response);
                })
              .catch((err) => {
                (this.errormsg = "error occured"), console.log(err.message);
              });
            }
            else{
               this.successmsg = "user updated";
                    this.isAddUser = false       
            }
           
            }
        )
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    validateUser(data,isadd) {
      //var isValid=true;
      if (!data.firstName) {
        this.errormsg = "Please enter first name";
         return false;
      }
      if (!data.lastName) {
        this.errormsg = this.errormsg + "Please enter last name";
         return false;
      }
      if (!data.userType) {
        this.errormsg = this.errormsg + "Please select user type";
          return false;
      }
       if (!data.userName) {
        this.errormsg = this.errormsg + "Please enter user name";
          return false;
      }
       if (isadd && !data.password ) {
        this.errormsg = this.errormsg + "Please enter password";
          return false;
      }
      return true;
      
    },
    editUser: function(data) {
      console.log('edit user call',data);
      this.isNew=!this.isNew
      data.isNew=this.isNew
      this.edituser = data;
      this.isAddUser = true;
    },
    onError() {
      console.log("onError parent");
      this.errormsg = "";
    },
    clearAddForm() {
      this.isAddUser = false;
      this.edituser={}
    },
  },
};