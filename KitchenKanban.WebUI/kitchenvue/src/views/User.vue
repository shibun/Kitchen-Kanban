<template>
  <div>
    <section>
      <div class="breadcrumb"><div>User List</div>
        <div class="current-time">{{currentdate |formatTime}}</div>
         <div class="clearfix"></div></div>
      <div class="list-sec">
        <div class="text-right">
          <button class="trans-btn" @click="showAddUser" id="adduserbutton">
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
            
            </tr>
            <tr v-bind:key="data.userId" v-for="(data, index) in users">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">
              <img src="../assets/images/no_user_img.png" v-if="data.imageId==null" class="display-user-img" />
                <img v-bind:src="'data:image/jpeg;base64,'+ data.imageContent" v-if="data.imageId!=null" class="display-user-img"/>
              </td>
              <td>{{ data.firstName }} {{ data.lastName }}</td>
              <td>{{ data.userName }}</td>
              <td>
                <span v-if="data.userType==1">Administrator</span>
                <span v-if="data.userType==2">FrontDesk</span>
                 <span v-if="data.userType==3">Chef</span>
                <span v-if="data.userType==4">BackOffice</span>
                <span v-if="data.userType==5">Service</span>               
             </td>
              <td class="text-center">
                <button
                  @click="editUser(data)"
                  data-toggle="modal"
                  data-target="#addUser"
                  class="trans-btn"
                >
                  <img src="../assets/images/edit.png" />
                </button>
              </td>
          
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="clearfix"></div>
    <AddUser
      :isAddUser.sync="isAddUser"
      v-bind:edituser="edituser"
      v-on:clear-add-user="clearAddForm"
      v-on:add-user="addUser"
      v-on:update-user="updateUser"
    />
    <MessageSuccess :msg="successmsg" v-on:on-success="reloadfunction" />
    <MessageError :msg="errormsg" v-on:on-error="onError" />
  </div>
</template>
<script src="../viewscripts/userScript.js" type="text/javascript">

</script>
