<template>
  <v-card class="ma-3 text-center" elevation="3">
    <v-card flat class="pa-4">
      <v-img max-height="300" :src="child.avatar" />
    </v-card>
    <v-card-title>{{ child.first_name }} {{ child.last_name }}</v-card-title>
    <v-list dense>
      <v-list-item>
        <v-list-item-content> Level </v-list-item-content>
        <v-list-item-content> 2 </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-btn rounded large class="ma-3 text-center" color="primary" @click="childDashboard">View</v-btn>
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
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    childDashboard() {
      this.$router.push(`/childDashboard/${this.child.id}`)
    }
  },
}
</script>
