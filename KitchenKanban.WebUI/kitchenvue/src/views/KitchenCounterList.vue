<template>
  <div>
    <section>
      <div class="breadcrumb">Kitchen Counter List</div>
      <div class="list-sec">
        <div class="text-right">
          <button class="trans-btn" @click="showForm">
            <img src="../assets/images/add.png" />
          </button>
        </div>
        <table class="custom-tbl">
          <tbody>
            <tr>
              <th class="text-center">Sl No</th>
              <th class="text-center">Counter Name</th>
              <th class="text-center">Edit</th>
              <th class="text-center">Delete</th>
            </tr>
            <tr
              v-for="(data, index) in KCounters"
              :key="data.KitchenId"
              v-show="KCounters.length > 0"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ data.counterNumber }}</td>

              <td class="text-center">
                <button
                  class="trans-btn"
                  @click="editKCounter(data)"
                  data-toggle="modal"
                  data-target="#addKitchenCounter"
                >
                  <img src="../assets/images/edit.png" />
                </button>
              </td>
              <td class="text-center">
                <button
                  class="trans-btn"
                  @click="deleteCounter(data.kitchenId)"
                >
                  <img src="../assets/images/delete.png" />
                </button>
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

    <div class="add-overlay" v-if="isShowForm">
      <div class="add-pop-overlay">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            @click="hideForm"
          >
            ×
          </button>
          <h4 class="modal-title">Add Kitchen Counter</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="container-fluid">
              <div class="row">
                <div class="col-xs-6">
                  <div class="form-group">
                    <label
                      >Kitchen Counter Name
                      <span class="asterisk">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="Kitchen.CounterNumber"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-default left-btn"
            data-dismiss="modal"
            @click="clearKCounter"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-active"
            v-if="!editmode"
            data-dismiss="modal"
            @click="addKCounter"
          >
            Add
          </button>
          <button
            type="button"
            class="btn btn-active"
            v-if="editmode"
            data-dismiss="modal"
            @click="updateKCounter"
          >
            Update
          </button>
        </div>
      </div>
    </div>
    <MessageSuccess :msg="successmsg" v-on:on-success="getKitchenCounters" />
    <MessageError :msg="errormsg" v-on:on-error="onError" />
  </div>
</template>
<script>
import KitchenCounterService from "../services/KitchenCounterService";
import MessageSuccess from "@/components/MessageSuccess.vue";
import MessageError from "@/components/MessageError.vue";
export default {
  name: "KitchenCounterService",
  created() {
    this.getKitchenCounters();
  },
  data() {
    return {
    Kitchen:{
     KitchenId:"",
     CounterNumber:""
    },
      CounterNumber: "",
      KCounters: [],
      showkcounters: false,
      successmsg: "",
      errormsg: "",
      editmode: false,
      isShowForm: false,
    };
  },
  components: {
    MessageSuccess,
    MessageError,
  },
  methods: {
    showForm() {
      this.isShowForm = true;
    },
    hideForm() {
      this.isShowForm = false;
    },
    getKitchenCounters() {
      (this.successmsg = false),
        KitchenCounterService.get().then((response) => {
          if (response.data.length > 0) {
            this.showkcounters = false;
            this.KCounters = response.data;
          } else {
            this.showkcounters = true;
          }
        });
    },
    addKCounter: function() {
      this.errormsg = "";
      if (!this.Kitchen.CounterNumber) {
        this.errormsg = "Please enter Counter Name";
        return;
      }
      KitchenCounterService.post(this.Kitchen)
        .then((response) => {
          this.successmsg = "Counter added",
           this.clearKCounter();
        })
        .catch((err) => {
          (this.errormsg = "error occured"), console.log(err.message);
        });
    },
    editKCounter: function(data) {
      (this.editmode = true),
        (this.isShowForm = true),
        (this.Kitchen.CounterNumber = data.counterNumber),
        (this.Kitchen.KitchenId=data.kitchenId);
    },
    updateKCounter: function() {
      if (!this.Kitchen.CounterNumber) {
        this.errormsg = "Please enter Counter Name";
        return;
      }
      KitchenCounterService.patch(this.Kitchen)
        .then((response) => {
          this.clearKCounter(),
            (this.successmsg = "Counter updated"),
             (this.editmode = false),
            console.log("Kitchen counter updated", response.data);
        })
        .catch((err) => {
          (this.errormsg = "error occured"),           
            console.log(err.message);
        });
    },
    deleteCounter: function(KitchenId) {
      KitchenCounterService.deletecounter(KitchenId)
        .then((response) => {
          this.successmsg = "Counter deleted";
        })
        .catch((err) => {
          (this.errormsg = "error occured"),
            console.log(err.message);
        });
    },
    onError() {
      console.log("onError parent");
      this.errormsg = "";
      this.iserror = false;
    },
    clearKCounter: function() {
      this.Kitchen={
        CounterNumber :"",
      },     
      this.isShowForm = false,
      this.editmode=false;
    },
  },
};
</script>
