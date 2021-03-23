<template>
  <v-container>
    <h1 v-if="child" class="mb-5">
      {{ child.first_name }} {{ child.last_name }}
    </h1>
    <!-- {{ child.imageName}} -->
    <!-- TODO Add section for DNE -->
    <h1 v-if="!exist">Does not exist</h1>
    <v-layout v-if="child" row wrap>
      <v-flex  xs12 sm12 md12 lg9 class="px-1">
        <v-row>
          <v-col cols="6">
            <ChildProfileCard/>
          </v-col>
          <v-col cols="6">
          <UserProgress :childImage="child.imageName" />
          </v-col>
        </v-row>
        <!-- Donation tasks -->
        <v-container>
          <v-card-title>Tasks to complete</v-card-title>
          <v-layout row wrap>
            <v-flex v-for="i in 4" :key="i" lg3 md6 sm12 xl3 class="pa-3">
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
  }),
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
      })
  },
}
</script>
