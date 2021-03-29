<template>
  <v-card max-width="300" elevation="5">
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-img height="120" contain :src="task.image"></v-img>
        {{ task.image }}
      </v-col>
      <v-col cols="6">
        <v-img height="120" :src="task.child_image"></v-img>
      </v-col>
    </v-row>
    <v-card-title>{{ child_name + ' ' + task.name }}</v-card-title>
    <v-card-title class="grey--text"
      >Cost
      <span class="green--text mx-2"> ${{ task.price }}</span></v-card-title
    >
    <v-card-subtitle>Gain {{ task.points }} points</v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn rounded class="primary" @click="itemInfo"
        >Send an item to child</v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
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
        itemImage:
          'https://images-na.ssl-images-amazon.com/images/I/61sYKIAutBL._AC_UL1500_.jpg',
        child_image:
          'https://i.pinimg.com/originals/61/da/44/61da44b76994503583af1148e9e6d8d6.jpg',
        points: 10,
        price: 25,
      }),
    },
  },
  methods: {
    itemInfo() {
      // this.$router.push(`/item/${this.child.id}`)
    },
  },
}
</script>
