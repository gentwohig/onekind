<template>
  <v-card v-if="user">
    <v-btn @click="updateUserLevel"> click</v-btn>
    <v-toolbar flat dense>
      <v-toolbar-title>
        <span class="subheading text-capitalize"
          >Sponsor Level - {{ colorNLevel[1] }}</span
        >
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
        v-model="level"
        :color="colorNLevel[0]"
        track-color="grey"
        max="12000"
      >
      </v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    interval: null,
    ticksLabels: ['Figs', 'Lemon', 'Pear', 'Apple'],
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
      this.$store.dispatch('updateUserLevel', 120)
    },
  },
}
</script>
