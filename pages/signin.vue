<template>
  <v-card class="text-center pa-3 py-10" width="400">
    <h2>Sign in</h2>
    <v-card-subtitle>
      Don't have an account?
      <nuxt-link class="blue--text" to="/signup"> Sign up </nuxt-link>
    </v-card-subtitle>
    <v-form ref="signup" @submit.prevent="signIn" class="mx-1">
      <v-container>
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
        <v-btn block type="submit" :loading="loading">Sign in</v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  layout: 'auth',
  data: () => ({
    email: '',
    password: '',
    required: [(v) => !!v || 'this is required'],
    loading: false,
  }),
  methods: {
    signIn() {
      this.loading = true
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          setTimeout(() => {
            this.loading = false
            this.$router.push('/userDashboard')
          }, 1000)
        })
    },
  },
}
</script>
