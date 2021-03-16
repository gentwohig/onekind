<template>
  <v-container>
    <h1>Children of Kind Organization</h1>
    <!-- {{ children }} -->
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Placerat orci nulla
      pellentesque dignissim enim sit.
    </p>

    <v-text-field
      filled
      rounded
      class="mx-15"
      prepend-inner-icon="fas fa-search"
    ></v-text-field>

    <!-- Data iterator -->
    <v-data-iterator
      :items="children"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar rounded class="ma-3 mb-6">
          <v-text-field
            v-model="search"
            clearable
            dense
            rounded
            filled
            hide-details
            prepend-inner-icon="fas fa-search"
            label="Search name, country, age"
          ></v-text-field>
          <!-- <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-autocomplete
              v-model="items"
              chips
              multiple
              flat
              clearable
              deletable-chips
              solo-inverted
              hide-details
              :items="countryFilterKeys"
              prepend-inner-icon="mdi-magnify"
              label="Filter by Origin"
            ></v-autocomplete>
            <v-spacer></v-spacer>
            <v-autocomplete
              v-model="items"
              chips
              multiple
              flat
              clearable
              deletable-chips
              solo-inverted
              hide-details
              :items="genderFilterKeys"
              prepend-inner-icon="mdi-magnify"
              label="Filter by Gender"
            ></v-autocomplete>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template> -->
        </v-toolbar>
      </template>

      <!-- ---- -->

      <template v-slot:default="props">
        <v-layout row wrap>
          <v-flex
            v-for="item in props.items"
            :key="item.id"
            xl3
            lg4
            md4
            sm6
            xs12
          >
            <v-card class="ma-3" elevation="3">
              <v-card flat class="pa-4">
                <v-img
                  max-height="300"
                  :src="item.imageName"
                />
              </v-card>
              <v-card-title>
                {{ item.first_name }} {{ item.last_name }}
              </v-card-title>
              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    :class="{ 'blue--text': sortBy === key }"
                    class="text-capitalize"
                  >
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content>
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <!-- Toggle -->

              <v-list-group :value="false">
                <template v-slot:activator>
                  <v-list-item-title>Medical Note</v-list-item-title>
                </template>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      item.medical_note
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-btn rounded class="primary mb-3 mx-3">Watch Video 📹 </v-btn>
              <v-btn outlined rounded class="mb-3 ml-1" @click="dialog = item">
                Sponsor 💞
              </v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-data-iterator>
    <v-dialog :value="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          {{ dialog }}

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="addChild(dialog)"> I accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import DATA from '../MOCK_DATA.json'
export default {
  layout: 'availableRecipients',
  data() {
    return {
      DATA,
      itemsPerPageArray: [4, 8, 12],
      children: [],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 1000,
      sortBy: 'name',
      keys: ['age', 'country', 'hobby', 'gender'],
      genderFilterKeys: ['Female', 'Male'],
      countryFilterKeys: ['Syria', 'Lybia'],
      dialog: null,
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== 'Name')
    },
    ...mapState(['user']),
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
    async addChild(child) {
      // logic for adding child to user
      await this.$fire.firestore
        .collection('users')
        .doc(this.user.uid)
        .collection('users_sponsored_children')
        .add(child)
      this.$router.push('/userDashboard')
    },
    async addChild2() {
      // try {
      await this.$fire.firestore
        .collection('users')
        .doc(this.user.uid)
        console.log(this.user)
        console.log(this.user.uid)

      // } catch(e) {
      //   console.log(e)
      // }
    }
    // addchildren() {
    //   this.DATA.forEach((item) => {
    //     this.$fire.firestore.collection('children').add(item)
    //   })
    // },
  },
  mounted() {
    // children() {
    var child_coll = this.$fire.firestore.collection('children')
    child_coll
      .limit(5)
      .get()
      .then((res) => {
        this.children = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
    // return children
    // },
  },
}
</script>
