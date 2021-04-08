<template>
  <v-card v-if="item" class="pa-3">
    <v-container>
      <v-layout fill-height row wrap align-center>
        <v-flex lg6 md12 sm12 xs12 class="pa-2 justify-center d-flex">
          <div style="max-width: 700px; min-width: 700px">
            <v-carousel v-model="model">
              <v-carousel-item
                v-for="(image, i) in item.images"
                :key="i"
                :src="image"
                contain
              >
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-flex>
        <v-flex lg6 md12 sm12 xs12 class="pa-2">
          <h1>
            {{ item.name }}
          </h1>
          <h2>
            {{ item.cost }}
          </h2>
          <h3 class="mt-5">Points: {{ item.points }}</h3>
          <h3 class="mt-5">Information</h3>
          <p>
            Choose any of the following options and click Send Item to send to
            child.
          </p>
          <v-btn class="primary mt-10" @click="updateUserLevel"
            >Send item</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    item: null,
    model: 0,
  }),
  props: {
    itemId: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateUserLevel() {
      this.$store.dispatch('updateUserLevel', this.item.points)
    },
  },
  mounted() {
    this.$fire.firestore
      .collection('items')
      .doc(this.itemId)
      .onSnapshot((res) => {
        if (!res.exists) {
          this.exist = false
          return
        }
        this.item = res.data()
        this.item.id = res.id
      })
  },
}
</script>
