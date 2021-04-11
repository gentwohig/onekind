<template>
  <v-container>
    <h1>Children of Kind Organization</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Placerat orci nulla
      pellentesque dignissim enim sit.
    </p>

    <v-text-field
      v-model="search"
      clearable
      filled
      rounded
      class="my-5"
      hide-details
      prepend-inner-icon="search"
      label="Search by name, country, age or gender"
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
            <v-card class="ma-3 rounded-xl" elevation="6">
              <v-card flat class="pa-4 text-center justify-center">
                <v-img height="350" class="rounded-xl" :src="item.avatar" />
              </v-card>
              <h3 class="pa-3">{{ item.first_name }} {{ item.last_name }}</h3>
              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <div class="text-capitalize">
                    {{ key }}:
                    <span class="px-2">
                      {{ item[key.toLowerCase()] }}
                    </span>
                  </div>
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
              <v-card-actions>
                <v-btn rounded class="primary mb-3 mx-3 pa-3"
                  >Watch Video <v-icon class="pa-3">smart_display</v-icon>
                </v-btn>
                <v-btn
                  outlined
                  rounded
                  class="mb-3 ml-1 pa-3"
                  @click="dialog = item"
                >
                  Sponsor
                  <v-icon class="pa-3" color="error">volunteer_activism</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-data-iterator>
    <v-dialog :value="dialog" width="500">
      <v-card>
        <v-card-title class="headline accent white--text">
          Privacy Policy
        </v-card-title>
        <v-card-text class="py-3">
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
          <v-btn color="error" rounded elevation="0" @click="dialog = false">
            Decline
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" rounded elevation="0" @click="addChild">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'availableRecipients',
  data() {
    return {
      items: [],
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
    // logic for adding child to user
    async addChild() {
      try {
        if (this.user.children) {
          await this.$fire.firestore
            .collection('users')
            .doc(this.user.uid)
            .update({
              children: this.$fireModule.firestore.FieldValue.arrayUnion(
                this.dialog.id
              ),
            })
        } else {
          await this.$fire.firestore
            .collection('users')
            .doc(this.user.uid)
            .set(
              {
                children: [this.dialog.id],
              },
              { merge: true }
            )
        }

        await this.$fire.firestore
          .collection('children')
          .doc(this.dialog.id)
          .update({ status: true })
        this.$router.push('/userDashboard')
      } catch (error) {
        console.log(error)
      }
    },
    async addChild2() {
      await this.$fire.firestore.collection('users').doc(this.user.uid)
    },
  },
  mounted() {
    var child_coll = this.$fire.firestore.collection('children')
    child_coll
      .limit(32)
      .where('status', '==', false)
      .get()
      .then((res) => {
        this.children = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  },
}
</script>
