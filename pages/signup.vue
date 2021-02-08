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
    <v-form>
      <v-container>
        <v-layout row wrap class="mx-1">
          <v-flex xs6 class="pr-1">
            <v-text-field filled dense placeholder="First name" />
          </v-flex>
          <v-flex xs6 class="pl-1">
            <v-text-field filled dense placeholder="Last name" />
          </v-flex>
          <v-text-field filled dense placeholder="Email" />
          <v-text-field filled dense placeholder="Password" type="password" />
          <v-btn block>Sign up</v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  layout: 'signup',
}
</script>
