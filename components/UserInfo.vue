<template>
  <div>
    <v-avatar size="82">
      <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
    </v-avatar>
    <v-card-title>John Smith</v-card-title>
    <v-form>
      <v-text-field label="First name" value="John" outlined></v-text-field>
      <v-text-field label="Last name" value="Smith" outlined></v-text-field>
      <v-text-field
        label="Email"
        value="www.example.com"
        outlined
      ></v-text-field>
      <v-text-field label="Password" value="1234" outlined></v-text-field>
      <v-textarea label="Bio"></v-textarea>
    </v-form>
    <v-btn>Add/update Payment Method</v-btn>
  </div>
</template>

<script>
export default {}
</script>
