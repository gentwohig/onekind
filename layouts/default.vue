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
