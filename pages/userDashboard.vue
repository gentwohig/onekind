<template>
  <v-container>
    <h1>User Dashboard</h1>
    <br />
    <v-layout row wrap>
      <h3 v-if="users_children.length == 0">No Children Sponsored</h3>
      <v-flex
        v-else
        v-for="child in users_children"
        :key="child.id"
        xl3
        lg4
        md4
        sm6
        xs12
      >
        <ChildCard :child="child" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    users_children: [],
  }),
  computed: {
    ...mapState(['user']),
  },
  watch: {
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
  mounted() {
    // children() {
    // var child_coll = this.$fire.firestore.collection('children')
    // child_coll
    //   .get()
    //   .then((res) => {
    //     this.children = res.docs.map((doc) => doc.data())
    //   })
    //   .catch((error) => {
    //     console.log('Error getting document:', error)
    //   })
    // return children
    // },
    // get user's sponsored children
    // var users_children = this.$fire.firestore.collection('children')
    // users_children
    //   .where(this.$fireModule.firestore.FieldPath.documentId(), 'in', this.user.children || [])
    //   .get()
    //   .then((res) => {
    //     this.users_children = res.docs.map((doc) => doc.data())
    //   })
    //   .catch((error) => {
    //     console.log('Error getting document:', error)
    //   })
  },
}
</script>
