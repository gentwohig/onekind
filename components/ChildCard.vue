<template>
  <v-card class="ma-3 text-center" elevation="3">
    <v-btn @click="unsponsor">delete</v-btn>
    {{ child.id }}
    <v-card flat class="pa-4">
      <v-img max-height="300" :src="child.imageName" />
    </v-card>
    <v-card-title>{{ child.first_name }} {{ child.last_name }}</v-card-title>
    <v-list dense>
      <v-list-item>
        <v-list-item-content> Level </v-list-item-content>
        <v-list-item-content> 2 </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-btn rounded large class="ma-3 text-center" color="primary">View</v-btn>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Child',
  props: {
    child: {
      type: Object,
      required: true,
    },
    // first_name: {
    //   type: String,
    //   required: true,
    // },
    // last_name: {
    //   type: String,
    //   required: true,
    // },
    // imageName: {
    //   type: String,
    //   required: true,
    // },
    // id: {
    //   type: String,
    //   required: true,
    // },
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async unsponsor() {
      try {
        console.log('here')
        await this.$fire.firestore
          .collection('users')
          .doc(this.user.uid)
          .update({
            children: this.$fireModule.firestore.FieldValue.arrayRemove(
              this.child.id
            ),
          })
        await this.$fire.firestore
          .collection('children')
          .doc(this.child.id)
          .update({ status: false })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
