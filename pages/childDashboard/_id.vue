<template>
  <v-container>
    <h1 class="mb-5">{{ child.first_name}} {{child.last_name}}</h1> 
    <!-- {{ child.imageName}} -->
    <!-- TODO Add section for DNE -->
    <h1 v-if="!exist">Does not exist</h1> 
    <v-layout v-if="child" row wrap>
      <v-flex lg9>
        <v-container>
          <v-layout justify-start align-start row wrap>
            <v-flex lg6>
              <user-progress :childImage = "child.imageName"/>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
          <!-- Donation tasks -->
          <v-layout row wrap>
            <v-flex lg4 class="mt-4">
              <task-card />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <!-- User info -->
      <v-flex lg3>
        <user-info />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    child: null,
    exist: true
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
