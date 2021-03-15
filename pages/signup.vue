<template>
  <v-card class="text-center pa-3 py-10" width="400" shaped>
    <h2>Create an account</h2>
    <v-card-subtitle>
      Already have an account?
      <v-btn
        class="blue--text text-decoration-underline"
        style="cursor: pointer"
        to="/signin"
      >
        Sign in
      </v-btn>
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
          <v-btn block type="submit">Sign up</v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  layout: 'signup',
  data: () => ({
    name: { first: '', last: '' },
    email: '',
    password: '',
    required: [(v) => !!v || 'this is required'],
  }),
  methods: {
    signup() {
      if (this.$refs.signup.validate()) {
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
                this.$router.push('/dashboard')
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
