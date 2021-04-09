<template>
  <v-card max-width="300" elevation="5">
    <v-row justify="center" align="center" v-if="task.childImageProvided">
      <v-col cols="6">
        <v-img height="120" contain :src="task.image"></v-img>
      </v-col>
      <v-col cols="6">
        <v-img height="120" :src="task.child_image"></v-img>
      </v-col>
    </v-row>
    <v-img
      v-if="!task.childImageProvided"
      height="120"
      contain
      :src="task.image"
    ></v-img>
    <v-card-title>{{ 'Send ' + child_name + ' a ' + task.name }}</v-card-title>
    <v-card-title class="grey--text">
      Cost
      <span class="green--text mx-2"> ${{ task.price }}</span>
    </v-card-title>
    <v-card-subtitle>Gain {{ task.points }} points</v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      {{ dialog }}
      <v-btn rounded class="primary mb-3" @click="dialog = true">
        Send item to child
      </v-btn>
      <v-dialog :value="dialog">
        <ItemInfo :itemId="task.item" />
      </v-dialog>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    item: null,
  }),
  props: {
    child_name: {
      type: String,
      default: 'Salva',
    },
    task: {
      type: Object,
      default: () => ({
        name: 'needs a winter Jacket',
        itemId: '1',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/61sYKIAutBL._AC_UL1500_.jpg',
        child_image:
          'https://i.pinimg.com/originals/61/da/44/61da44b76994503583af1148e9e6d8d6.jpg',
        points: 10,
        price: 25,
      }),
    },
  },
  mounted() {
    // const { id } = this.itemId
    // if (!id) this.$router.push('/userDashboard')
    console.log(this.task.item)
    this.$fire.firestore
      .collection('items')
      .doc(this.task.item)
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
