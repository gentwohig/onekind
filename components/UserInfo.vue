<template>
  <div v-if="user">
    <v-card-title>{{ Object.values(user.name).join(', ') }}</v-card-title>
    <v-form>
      <v-text-field
        label="First name"
        :value="user.name.first"
        outlined
        readonly
      ></v-text-field>
      <v-text-field
        label="Last name"
        :value="user.name.last"
        outlined
        readonly
      ></v-text-field>
      <v-text-field label="Email" :value="user.email" outlined></v-text-field>
      <v-textarea label="Bio" v-model="user_bio"></v-textarea>
    </v-form>
    <v-btn color="secondary" @click="updateBio">Update Bio</v-btn>
    <v-btn color="primary">Add/update Payment Method</v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    user_bio: '',
  }),
  computed: {
    ...mapState(['user']),
  },
  watch:{
    user(val){
      if(val) this.user_bio = val.bio
    }
  },
  methods: {
    updateBio() {
      console.log(this.user_bio)
      this.$fire.firestore
        .collection('users')
        .doc(this.user.uid)
        .update({ bio: this.user_bio })
    },
  },
}
</script>
