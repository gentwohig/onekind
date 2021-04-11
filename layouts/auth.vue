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
  background-image: linear-gradient(
    to right,
    #ff00f4,
    #ff00af,
    #ff2d72,
    #ff6c43,
    #ff9624,
    #fdac2a,
    #fac037,
    #f6d448,
    #f1db67,
    #ede184,
    #eae79f,
    #eaebba
  );
}
</style>
