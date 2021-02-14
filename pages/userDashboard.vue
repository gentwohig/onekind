<template>
  <v-container>
    <h1>User Dashboard</h1>
    <br />
    <v-layout justify-start align-start row wrap>
      <v-flex lg6>
        <!-- Avatar and user progress -->
        <v-card flat class="pa-4">
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
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
    <!-- Donation tasks -->
    <v-layout row wrap>
      <v-flex lg4 class="mt-4">
        <v-card elevation="2" class="">
          <v-card-title>Donate Zafia a winter jacket 🧥</v-card-title>
          <v-card-subtitle>Gain 5 points</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded class="primary ma-3">$10</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- ----------------------------- -->
  </v-container>
</template>

<script>
export default {
  layout: 'userDashboard',
}
</script>
