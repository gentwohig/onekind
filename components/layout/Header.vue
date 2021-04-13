<template>
  <v-app-bar flat app color="white">
    <v-toolbar-title style="font-weight: bold; font-size: 24px">
      OneKind
    </v-toolbar-title>
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
      <v-btn text color="accent" @click="$fire.auth.signOut()"> Sign out </v-btn>
    </span>
  </v-app-bar>
</template>
