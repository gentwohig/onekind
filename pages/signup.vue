<template>
  <v-card class="text-center pa-3 py-10" width="400">
    <h2>Create an account</h2>
    <v-card-subtitle>
      Already have an account?
      <nuxt-link
        class="blue--text"
        to="/signin"
      >
        Sign in
      </nuxt-link>
    </v-card-subtitle>
    <v-form ref="signup" @submit.prevent="signup">
      <v-container>
        <v-layout row wrap class="mx-1">
          <v-flex xs6 class="pr-1">
            <v-text-field
              filled
              dense
              v-model="name.first"
              :rules="required"
              placeholder="First name"
            />
          </v-flex>
          <v-flex xs6 class="pl-1">
            <v-text-field
              filled
              dense
              :rules="required"
              v-model="name.last"
              placeholder="Last name"
            />
          </v-flex>
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
          <v-btn block type="submit" :loading="loading">Sign up</v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  layout: 'auth',
  data: () => ({
    name: { first: '', last: '' },
    email: '',
    password: '',
    required: [(v) => !!v || 'this is required'],
    loading: false,
  }),
  methods: {
    signup() {
      if (this.$refs.signup.validate()) {
        this.loading = true
        this.$fire.auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            console.log(userCredential)
            this.$fire.firestore
              .collection('users')
              .doc(userCredential.user.uid)
              .set({
                name: this.name,
                email: this.email,
              })
              .then((res) => {
                setTimeout(() => {
                  this.loading = false
                  this.$router.push('/userDashboard')
                }, 1000)
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
  },
}
</script>
