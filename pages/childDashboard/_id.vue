<template>
  <v-container>
    <h1 v-if="child" class="mb-5">
      {{ child.first_name }} {{ child.last_name }}
    </h1>
    <!-- TODO Add section for DNE -->
    <h1 v-if="!child">Does not exist</h1>
    <v-layout v-if="child" row wrap>
      <!-- <v-flex xs12 sm12 md12 lg9 class="px-1"> -->
      <v-flex lg6 sm12 xs12 class="pa-2">
        <ChildProfileCard :child="child" />
      </v-flex>
      <v-flex lg6 sm12 xs12 class="pa-2">
        <UserProgress :level="$colorNLevel(child.user_points)" />
      </v-flex>
    </v-layout>
    <!-- Donation tasks -->
    <v-card-title>Tasks to complete</v-card-title>
    <v-layout row wrap>
      <v-flex
        v-for="task in tasks"
        :key="task.id"
        xl2
        lg3
        md6
        sm4
        xl3
        class="pa-2"
      >
        <TaskCard
          :child_name="child.first_name"
          :task="task"
          :item="getItem(task)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    child: null,
    items: [],
    tasks: [],
  }),
  watch: {
    child(val) {
      if (val) {
        this.getTasks()
      }
    },
    tasks(val) {
      if (val.length) this.getTaskItems()
    },
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.getChild(id)
    } else {
      this.$router.push('/userDashboard')
    }
  },
  methods: {
    getChild(id) {
      this.$fire.firestore
        .collection('children')
        .doc(id)
        .onSnapshot((res) => {
          if (res.exists) this.child = { ...res.data(), id: res.id }
          else this.child = null
        })
    },
    getTasks() {
      console.log(this.child.id)
      this.$fire.firestore
        .collection('children')
        .doc(this.child.id)
        .collection('tasks')
        .onSnapshot((res) => {
          this.tasks = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        })
    },
    async getTaskItems() {
      if (this.tasks.length < 1) return []
      const items = []
      for (let index = 0; index < this.tasks.length; index++) {
        const itemID = this.tasks[index].itemID
        const item = await this.$fire.firestore
          .collection('items')
          .doc(itemID)
          .get()
        items.push({ id: item.id, ...item.data() })
      }
      this.items = items
    },
    getItem(task) {
      return this.items.find((i) => i.id === task.itemID) || {}
    },
  },
}
</script>
