<template>
  <v-app-bar flat app color="white">
    <v-toolbar-title
      v-text="title"
      style="font-weight: bold; font-size: 24px"
    />
    <v-spacer></v-spacer>
    <v-btn v-if="$vuetify.breakpoint.mdAndDown" icon @click="$emit('openNav')">
      <v-icon>menu</v-icon>
    </v-btn>
    <span v-else>
      <v-btn text color="accent" to="/availableRecipients">
        Available Recipients
      </v-btn>
      <v-btn text color="accent" to="/userDashboard"> Dashboard </v-btn>
      <v-btn text color="accent" to="/settings"> Settings </v-btn>
      <v-btn text color="accent" @click="signOut"> Sign out </v-btn>
    </span>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      collapseOnScroll: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      rightDrawer: false,
      title: 'OneKind',
    }
  },
  methods: {
    signOut() {
      this.$fire.auth.signOut()
    },
  },
}
</script>
