<template>
  <v-card height="800">
    <v-layout>
      <v-flex lg6>
        <v-img
          src="https://ae01.alicdn.com/kf/HTB1Bqu0VSzqK1RjSZFLq6An2XXai/Acrylic-Paints-Set-to-Paint-Crafts-Acrylic-Painting-12-18-24-Colors-Graffiti-for-Kids-and.jpg"
        ></v-img>
      </v-flex>
      <v-flex lg6>
        <v-card-title>Painting set</v-card-title>
        <v-card-title>{{ item.points }}</v-card-title>
        <!-- <v-card-subtitle>{{ item.points }}</v-card-subtitle> -->
      </v-flex>
    </v-layout>
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
        // this.child.id = res.id
      })
  },
}
</script>
