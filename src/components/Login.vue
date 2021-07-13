<template>
<v-card
    class="mx-auto mt-16 justify-center"
    max-width="344"
    outlined
  >
      <v-card-title
      class="justify-center indigo darken-4 white--text"
      >
      <span class="text-h6 font-weight-light">Login</span>
    </v-card-title>
    <v-card-text>
        <v-form
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="form.username"
      :counter="10"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      label="Password"
      :type="show1 ? 'text' : 'password'"
      required
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-btn
      color="success"
      class="mr-4"
      @click="userLogin"
    >
      Login
    </v-btn>
  </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      show1: false,
      form: {
        username: "",
        password: "",
      },
      errors: null,
      currentAlertCounter: 10,
    };
  },
  methods: {
    userLogin() {
      this.$store
        .dispatch("login", this.form)
        .then(()  => {
          this.$router.push('/trxpage'); 
          // if(this.user.role_id == 1){
          //   this.$router.push({ name: "TrxPage" }).catch(() => {});
          // }else if (this.user.role_id == 3){
          //   this.$router.push({ name: "TrxPage" }).catch(() => {});
          // }else if (this.user.role_id == 2){
          //   this.$router.push({ name: "TrxPageValidator" }).catch(() => {});
          // } 
        })    
    }
  },
  computed: {
        ...mapGetters({
        user: 'user',
      })     
  },
};
</script>

