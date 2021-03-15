<template>
  <div>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar flat app color="white">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title
        v-text="title"
        style="font-weight: bold; font-size: 24px"
      />
      <v-spacer></v-spacer>
      <v-btn text class="black--text" v-if="collapseOnScroll == false"
        >Dashboard</v-btn
      >
      <v-btn text class="black--text" v-if="collapseOnScroll == false" @click="signOut">
        Sign out
      </v-btn>
    </v-app-bar>
  </div>
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
    }
  }
}
</script>
