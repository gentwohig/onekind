<template>
  <div>
    <h1>Items</h1>

    <!-- <div v-if="!exist">this item does not exist</div>

    <v-container v-else-if="item">
      <v-layout row wrap>
        <v-flex lg6>
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
        </v-flex>
        <v-flex lg6>
          <h2>Socks</h2>
          {{ item }}
        </v-flex>
      </v-layout>
    </v-container> -->
  </div>
</template>
<script>
import DATA from '../../Tasks.json'
export default {
  data: () => ({
    exist: true,
    items: [],
    exist: true,
    DATA,
  }),
  methods: {
    addTasktoChild(id, task) {
      this.$fire.firestore
        .collection('children')
        .doc(id)
        .collection('tasks')
        .add(task)
    },
  },
  mounted() {
    var child = this.$fire.firestore.collection('users').doc(this.user.uid)
    console.log(child)
  },
  // mounted() {
  //   const { id } = this.$route.params
  //   if (!id) this.$router.push('/userDashboard')
  //   this.$fire.firestore
  //     .collection('children')
  //     .doc(id)
  //     .get()
  //     .then((res) => {
  //       this.child = res.data()
  //     })
  //   // .get()
  //   // .then((res) => {
  //   //   // if (!res.exists) {
  //   //   //   this.exist = false
  //   //   //   return
  //   //   // }
  //   //   res.forEach((item) => {
  //   //     // this.items.push(item.id)
  //   //     // DATA.forEach((task) => this.addTasktoChild(item.id, task))
  //   //   })
  //   //   // this.item = Object.values(res)[0]
  //   //   this.exist = true
  //   //   this.item = res.data()
  //   // })
  // },
}
</script>
