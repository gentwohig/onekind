<template>
  <v-container>
    <h1 v-if="child" class="mb-5">
      {{ child.first_name }} {{ child.last_name }}
    </h1>
    <h1 v-if="!child">Does not exist</h1>
    <v-layout v-if="child" row wrap>
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
    // watch child for loading and get child's tasks when loaded
    child(val) {
      if (val) {
        this.getTasks()
      }
    },
    // watch tasks for loading and get tasks' items when loaded
    tasks(val) {
      if (val.length) this.getTaskItems()
    },
  },
  mounted() {
    // getting id from route parameter 
    const id = this.$route.params.id
    if (id) {
      this.getChild(id)
    } else {
      this.$router.push('/userDashboard')
    }
  },
  methods: {
    // gets child info from children collection
    getChild(id) {
      this.$fire.firestore
        .collection('children')
        .doc(id)
        .onSnapshot((res) => {
          if (res.exists) this.child = { ...res.data(), id: res.id }
          else this.child = null
        })
    },
    // gets tasks subcollection from children collection 
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
    // gets  items from items collection for each task
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
    // finds specific item by itemID
    getItem(task) {
      return this.items.find((i) => i.id === task.itemID) || {}
    },
  },
}
</script>
