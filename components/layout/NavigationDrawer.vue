<template>
  <v-navigation-drawer app v-model="nav" temporary right>
    <v-list-item to="/availableRecipients">
      <v-list-item-content>
        <v-list-item-title> Available Recipients </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item to="/userDashboard">
      <v-list-item-content>
        <v-list-item-title> Dashboard </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item to="/settings">
      <v-list-item-content>
        <v-list-item-title> Settings </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click="signOut">
      <v-list-item-content>
        <v-list-item-title> Sign out </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    nav: false,
  }),
  methods: {
    openNav() {
      this.nav = true
    },
    signOut() {
      this.$fire.auth.signOut()
    },
  },
}
</script>
