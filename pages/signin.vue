<template>
     <v-card class="text-center pa-3 py-10" width="400" shaped>
    <h2>Create an account</h2>
    <v-card-subtitle>
      Already have an account?
      <span
        class="blue--text text-decoration-underline"
        style="cursor: pointer"
      >
        Sign in
      </span>
    </v-card-subtitle>
    <v-form ref="signup" @submit.prevent="signIn">
      
          <v-text-field
            filled
            dense
            v-model="email"
            :rules="required"
            placeholder="Email"
          />
          <v-text-field
            filled
            dense
            :rules="required"
            v-model="password"
            placeholder="Password"
            type="password"
          />
          <v-btn block type="submit">Sign up</v-btn>
       
    </v-form>
  </v-card>
</template>
<script>
export default {
    layout: 'signup',
    data: () => ({
    email: '',
    password: '',
    required: [(v) => !!v || 'this is required'],
  }),
  methods: {
      signIn() {
          this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
              this.$router.push('/userDashboard')
          })
      }
  }
}
</script>