<template>
  <v-card elevation="5" class="rounded-xl">
    <div class="pa-2">
    <v-img height="120" contain class="rounded-xl" :src="getImage(item.images)"></v-img>
    </div>
    <h3 class="pa-2">{{ 'Send ' + child_name + ' a ' + item.name }}</h3>
    <v-card-title class="grey--text">
      Cost
      <span class="green--text mx-2">{{ item.cost }}</span>
    </v-card-title>
    <v-card-subtitle>Gain {{ item.points }} points</v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn elevation="0" color="primary" class="mb-3" @click="dialog = true">
        Send item to child
      </v-btn>
      <v-dialog v-model="dialog">
        <ItemInfo :item="item" :task="task" />
      </v-dialog>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    child_name: {
      type: String,
      default: 'Salva',
    },
    item: {
      type: Object,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImage(images) {
      if (images) return images[0]
      return ''
    },
  },
}
</script>
