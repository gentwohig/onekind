<template>
  <v-container>
    <h1>Children of Kind Organization</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Placerat orci nulla
      pellentesque dignissim enim sit.
    </p>
    <!-- Data iterator -->
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="sortBy"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search by name"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
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
          </template>
        </v-toolbar>
      </template>

      <!-- ---- -->

      <template v-slot:default="props">
        <v-layout row wrap>
          <v-flex
            v-for="item in props.items"
            :key="item.name"
            xl3
            lg3
            md4
            sm6
            xs12
          >
            <v-card class="ma-3">
              <v-img
                max-height="150"
                src="https://picsum.photos/id/11/500/300"
              />
              <v-card-title>{{ item.name }}</v-card-title>
              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    :class="{ 'blue--text': sortBy === key }"
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
                <v-btn class="primary mx-9 my-4">Watch Video 📹 </v-btn>
                <v-btn>Sponsor 💞</v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  layout: 'availableRecipients',
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: ['Age', 'Origin', 'Hobby', 'Gender'],
      genderFilterKeys: ['Female', 'Male'],
      countryFilterKeys: ['Syria', 'Lybia'],
      items: [
        {
          name: 'Genevieve',
          age: 5,
          origin: 'Syria',
          hobby: 'Drawing',
          medical_note: 'Deaf',
          gender: 'Female',
        },
        {
          name: 'Mayar',
          age: 6,
          origin: 'Lybia',
          hobby: 'Soccor',
          medical_note: '',
          gender: 'Male',
        },
        {
          name: 'Angela',
          age: 8,
          origin: 'Lybia',
          hobby: 'Dancing',
          medical_note: '',
          gender: 'Female',
        },
        {
          name: 'Theo',
          age: 8,
          origin: 'Syria',
          hobby: 'Dancing',
          medical_note: '',
          gender: 'Male',
        },
      ],
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== 'Name')
    },
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
  },
}
</script>
