<template>
  <div>
    <v-container v-if="loading">
      <h1 class="text-center my-14">Loading</h1>
    </v-container>
    <v-container v-else>
      <h1 v-if="child" class="mb-5">
        {{ child.first_name }} {{ child.last_name }}
      </h1>
      <!-- TODO Add section for DNE -->
      <h1 v-if="!exists">Does not exist</h1>
      <v-layout v-if="child" row wrap>
        <!-- <v-flex xs12 sm12 md12 lg9 class="px-1"> -->
        <v-row>
          <v-col cols="6">
            <ChildProfileCard :child="child" />
          </v-col>
          <v-col cols="6">
            <UserProgress />
          </v-col>
        </v-row>
        <!-- Donation tasks -->
        <v-container>
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
        <!-- </v-flex> -->
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: true,
    exists: false,
    child: {},
    items: [],
    tasks: [],
  }),
  async mounted() {
    const id = this.$route.params.id
    if (id) {
      this.child = await this.getChild(id)
      if (!this.child) {
        this.loading = false
        return
      }
      this.tasks = await this.getTasks(id)
      this.items = await this.getTaskItems(this.tasks)
      this.loading = false
      this.exists = true
    } else {
      this.$router.push('/userDashboard')
    }
  },
  methods: {
    async getChild(id) {
      const child = await this.$fire.firestore
        .collection('children')
        .doc(id)
        .get()
      if (!child.exists) return null
      return child.data()
    },
    async getTasks(childId) {
      const tasks = await this.$fire.firestore
        .collection('children')
        .doc(childId)
        .collection('tasks')
        .get()
      if (tasks.size < 1) return []
      else return tasks.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    },
    async getTaskItems(tasks) {
      if (tasks.length < 1) return []
      const items = []
      for (let index = 0; index < tasks.length; index++) {
        const itemID = tasks[index].itemID
        const item = await this.$fire.firestore
          .collection('items')
          .doc(itemID)
          .get()
        items.push({ id: item.id, ...item.data() })
      }
      return items
    },
    getItem(task) {
      return this.items.find((i) => i.id === task.itemID) || {}
    },
  },
}
</script>
