<template>
  <v-container fluid>
    <h1>User Dashboard</h1>
    <br />
    <!-- Avatar and user progress -->
    <v-layout row wrap>
      <v-flex lg9 class="yellow">
        <v-container>
          <v-layout justify-start align-start row wrap>
            <v-flex lg6>
              <user-progress />
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
          <!-- Donation tasks -->
          <v-layout row wrap>
            <v-flex lg4 class="mt-4">
              <task-card />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <!-- User info -->
      <v-flex lg3 class="red">
        <user-info />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import taskCard from '~/components/taskCard.vue'
import UserProgress from '~/components/UserProgress.vue'
export default {
  components: { taskCard, UserProgress },
  layout: 'userDashboard',
}
</script>
