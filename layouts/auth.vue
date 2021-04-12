<template>
  <v-app>
    <v-main>
      <v-container class="background" fluid fill-height>
        <v-layout row wrap justify-center align-center fill-height>
          <nuxt />
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.background {
  background-image: url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-position: center;
  background-size: 100%;
  
}
</style>
