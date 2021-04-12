<template>
  <v-card class="rounded-xl">
    <v-container>
      <v-toolbar flat dense>
        <v-toolbar-title>
          <span class="subheading text-capitalize">
            Sponsor Level - {{ level.badge }}
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="black">share</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row class="mb-4" justify="space-between">
          <v-col cols="8" class="text-left">
            <span class="display-3 font-weight-light">{{ level.points }}</span>
            <span class="subheading font-weight-light mr-1">points</span>
          </v-col>
          <v-col class="text-right">
            <v-icon :color="level.color" large> verified </v-icon>
          </v-col>
        </v-row>

        <v-slider
          readonly
          :value="level.points"
          :color="level.color"
          track-color="grey"
          :max="maxPoints"
        >
        </v-slider>
      </v-card-text>
      <!-- <v-btn color="primary" @click="updateUserLevel">Click me</v-btn> -->
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    maxPoints: 400,
  }),
  props: {
    level: {
      type: Object,
      default: () => ({
        badge: 'Bronze',
        color: '#CD7F32',
        points: 0
      })
    }
  },
}
</script>
