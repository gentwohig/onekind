<template>
  <v-card v-if="user" class="rounded-xl">
    <v-container>
      <v-toolbar flat dense>
        <v-toolbar-title>
          <span class="subheading text-capitalize">
            Sponsor Level - {{ colorNLevel[1] }}
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>fas fa-share-alt</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row class="mb-4" justify="space-between">
          <v-col cols="8" class="text-left">
            <span class="display-3 font-weight-light">{{ level }}</span>
            <span class="subheading font-weight-light mr-1">points</span>
          </v-col>
          <v-col class="text-right">
            <v-icon :color="colorNLevel[0]" large> fas fa-certificate </v-icon>
          </v-col>
        </v-row>

        <v-slider
          readonly
          v-model="level"
          :color="colorNLevel[0]"
          track-color="grey"
          :max="maxPoints"
        >
        </v-slider>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    interval: null,
    ticksLabels: ['Figs', 'Lemon', 'Pear', 'Apple'],
    maxPoints: 9000,
  }),
  computed: {
    level() {
      return this.user.level || 0
    },
    colorNLevel() {
      if (this.level < 3000) return ['#CD7F32', 'bronze']
      if (this.level < 6000) return ['#C0C0C0', 'silver']
      if (this.level < 9000) return ['#DAA520', 'gold']
      return ['#E5E4E2', 'platinum']
    },
    ...mapState(['user']),
  },
  methods: {
    updateUserLevel() {
      if (this.user.level < this.maxPoints)
        this.$store.dispatch('updateUserLevel', 120)
    },
  },
}
</script>
