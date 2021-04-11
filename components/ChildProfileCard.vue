<template>
  <v-card elevation="5" class="rounded-xl">
    <v-container>
      <v-layout row wrap>
        <v-flex lg6>
          <v-img max-height="300" class="rounded-xl" :src="child.avatar"></v-img>
        </v-flex>
        <v-flex lg6>
          <v-list dense>
            <v-list-item>
              <v-list-item-content> Age </v-list-item-content>
              <v-list-item-content>
                {{ child.age }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> Country </v-list-item-content>
              <v-list-item-content>
                {{ child.country }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> Hobby </v-list-item-content>
              <v-list-item-content>
                {{ child.hobby }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> Gender </v-list-item-content>
              <v-list-item-content>
                {{ child.gender }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list-group :value="false">
            <template v-slot:activator>
              <v-list-item-title>Medical Note</v-list-item-title>
            </template>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ child.medical_note }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: 'Child',
  props: {
    child: {
      type: Object,
      required: true,
    },
  },
}
</script>
