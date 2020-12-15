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
      currentdate:'',
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
  mounted: function () {
    setInterval(function () {
      this.getNow()
    }.bind(this), 1000)
  },
  methods: {
    showForm() {
      this.isShowForm = true;
    },
     getNow: function() {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + ' ' + time;
      this.currentdate = dateTime;
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
        .catch((error) => {
          (this.errormsg = error.data),
            console.log(error.data);
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