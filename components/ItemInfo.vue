<template>
  <v-card v-if="item" class="pa-3">
    <v-container>
      <v-layout fill-height row wrap align-center>
        <v-flex lg6 md12 xs12 class="pa-2">
          <v-img max-height="600" contain :src="item.image"></v-img>
        </v-flex>
        <v-flex lg6 md12 xs12 class="pa-2">
          <!-- <v-layout align-center justify-center row wrap> -->

          <h1>
            {{ item.name }}
          </h1>
          <!-- <v-col cols="12" class="text-h4 font-weight-bold text-capitalize"> -->
          <h2>
            {{ item.cost }}
          </h2>
          <!-- </v-col> -->
          <!-- <v-col cols="12" class="text-h6 font-weight-medium"> -->

          <h2>Points: {{ item.points }}</h2>
          <!-- </v-col> -->
          <!-- <v-col cols="12"> -->
          <v-btn class="primary">Send item</v-btn>
          <!-- </v-col> -->

          <!-- </v-layout>   -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    item: null,
  }),
  props: {
    itemId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    // const { id } = this.itemId
    // if (!id) this.$router.push('/userDashboard')
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
        // this.child.id = res.id
      })
  },
}
</script>
