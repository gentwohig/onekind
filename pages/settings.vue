<template>
  <v-container>
    <h1>Settings</h1>
    <v-layout justify-center row wrap>
      <v-flex lg6 md12 sm12 xs12 class="ma-3">
        <UserInfo />
      </v-flex>
      <v-flex lg6 md12 sm12 xs12 class="ma-3">
        <h2 class="mt-12 mb-4">Sponsored Children</h2>
        <v-data-table
          :headers="headers"
          :items="users_children"
          class="elevation-1"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-btn small @click="unsponsor(item.id)" color="error">Unsponsor</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    users_children: [],
    headers: [
      {
        text: 'First name',
        align: 'start',
        sortable: false,
        value: 'first_name',
      },
      { text: 'Last name', value: 'last_name' },
      { text: 'Age', value: 'age' },
      { text: 'Country', value: 'country' },
      { text: 'Gender', value: 'gender' },
      { text: 'Sponsor/Unsponsor', value: 'status', sortable: false },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ],
  }),
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async unsponsor(child_id) {
      try {
        console.log('here')
        await this.$fire.firestore
          .collection('users')
          .doc(this.user.uid)
          .update({
            children: this.$fireModule.firestore.FieldValue.arrayRemove(
              child_id
            ),
          })
        await this.$fire.firestore
          .collection('children')
          .doc(child_id)
          .update({ status: false })
      } catch (error) {
        console.error(error)
      }
    },
  },
  watch: {
    user: {
      handler(val) {
        if (val.children)
          if (val.children.length)
            this.$fire.firestore
              .collection('children')
              .where(
                this.$fireModule.firestore.FieldPath.documentId(),
                'in',
                val.children
              )
              .onSnapshot((res) => {
                this.users_children = res.docs.map((child) => {
                  const data = child.data()
                  data.id = child.id
                  return data
                })
              })
        this.users_children = []
      },
      immediate: true,
    },
  },
}
</script>
