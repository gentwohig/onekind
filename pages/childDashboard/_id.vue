<template>
  <v-container>
    <h1 v-if="child" class="mb-5">
      {{ child.first_name }} {{ child.last_name }}
    </h1>
    <!-- {{ child.imageName}} -->
    <!-- TODO Add section for DNE -->
    <h1 v-if="!exist">Does not exist</h1>
    <v-layout v-if="child" row wrap>
      <v-flex xs12 sm12 md12 lg9 class="px-1">
        <v-row>
          <v-col cols="6">
            <ChildProfileCard :child="child" />
          </v-col>
          <v-col cols="6">
            <UserProgress :childImage="child.imageName" />
          </v-col>
        </v-row>
        <!-- Donation tasks -->
        <v-container>
          <v-card-title>Tasks to complete</v-card-title>
          <v-layout row wrap>
            <v-flex
              v-for="task in childTasks"
              :key="task.id"
              lg4
              md6
              sm4
              xl3
              class="pa-3"
            >
              <TaskCard :child_name="child.first_name" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <!-- User info -->
      <v-flex lg3 class="px-1">
        <UserInfo />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    child: null,
    exist: true,
    childTasks: [],
  }),
  watch: {
    child: {
      handler(val) {
        if (val) {
          console.log('VAL:', val)
          this.$fire.firestore
            .collection('children')
            .doc(val.id)
            .collection('tasks')
            .onSnapshot((res) => {
              this.childTasks = []
              res.forEach((item) => this.childTasks.push(item.data()))
            })

          // .where(
          //       this.$fireModule.firestore.FieldPath.documentId(),
          //       'in',
          //       val
          //     )
          // .onSnapshot((res) => {

          // })
        }
      },
      immediate: true,
    },
  },
  mounted() {
    const { id } = this.$route.params
    if (!id) this.$router.push('/userDashboard')
    this.$fire.firestore
      .collection('children')
      .doc(id)
      .onSnapshot((res) => {
        if (!res.exists) {
          this.exist = false
          return
        }
        this.child = res.data()
        this.child.id = res.id
      })
  },
}
</script>
