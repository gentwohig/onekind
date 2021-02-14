<template>
  <v-card elevation="5" class="pa-4">
    <v-container>
      <v-layout row wrap>
        <v-flex xs4>
          <v-img src="./boyAvatar.jpg"></v-img>
        </v-flex>
        <v-flex xs8>
          <h4>
            Level 2
            <v-progress-linear value="80" rounded height="25">
              <strong>80%</strong>
            </v-progress-linear>
          </h4>
          <h4>100 Points</h4>
          <h4>5 Gold Coins</h4>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {}
</script>
