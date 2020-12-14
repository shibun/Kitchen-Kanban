<template>
  <div>
    <section>
      <div class="breadcrumb">User List</div>
      <div class="list-sec">
        <div class="text-right">
          <button class="trans-btn" @click="showAddUser">
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
            <tr v-bind:key="data.userId" v-for="(data, index) in users">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">
              <img src="../assets/images/no_user_img.png" v-if="data.imageId==null" class="display-user-img" />
                <img v-bind:src="'data:image/jpeg;base64,'+ data.imageContent" v-if="data.imageId!=null" class="display-user-img"/>
              </td>
              <td>{{ data.firstName }} {{ data.lastName }}</td>
              <td>{{ data.userName }}</td>
              <td>{{ data.userType }}</td>
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
              <td class="text-center">
                <button class="trans-btn">
                  <img src="../assets/images/delete.png" />
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
    <MessageSuccess :msg="successmsg" v-on:on-success="getUsers" />
    <MessageError :msg="errormsg" v-on:on-error="onError" />
  </div>
</template>
<script src="../viewscripts/userScript.js" type="text/javascript">

</script>
