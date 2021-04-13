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
