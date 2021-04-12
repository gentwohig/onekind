<template>
  <v-app>
    <Header @openNav="$refs.navigationDrawer.openNav()" />
    <navigation-drawer ref="navigationDrawer" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user', 'authChanged']),
  },
  watch: {
    authChanged: {
      handler(val) {
        if (val && !this.user) this.$router.push('/signin')
      },
      immediate: true,
    },
    user(val) {
      // if (val) this.$router.push('/availableRecipients') // if sign out does it go to here
    },
  },
}
</script>
