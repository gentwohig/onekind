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
            <v-btn small @click="unsponsor(item.id)" color="error">
              Unsponsor
            </v-btn>
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
  }),
  computed: {
    ...mapState(['user']),
  },
  methods: {
    // removes child from user and sets child back in children array w/ status false
    async unsponsor(child_id) { 
      try {
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
          .update({ status: false, user_points: 0 })
      } catch (error) {
        console.error(error)
      }
    },
  },
  watch: {
    // watching user to request user's sponsored children 
    user: {
      handler(val) {
        if (val)
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
