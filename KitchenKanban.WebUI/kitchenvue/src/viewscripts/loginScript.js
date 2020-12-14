export default {
    data() {
      return {
        Username: "",
        password: "",
        loginsuccess: true,
      };
    },
    methods: {
      login: function() {
        let Username = this.Username;
        let password = this.password;
        this.$store
          .dispatch("login", { Username, password })
          .then(() => this.$router.push("/"))
          .catch(
            (err) => {
            console.log("login error",err);
            this.loginsuccess = false;
            }
          );
      },
    },
  };