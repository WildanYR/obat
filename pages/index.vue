<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <!-- Information Card -->
        <v-col cols="12">
          <v-row justify="space-around" align="center">
            <v-col cols="12" sm="3">
              <v-card nuxt to="/pasien">
                <v-card-text class="text-center">
                  <p>
                    <v-icon size="30">fas fa-plus-circle</v-icon>
                  </p>
                  <div class="body-1">Periksa</div>
                  <div class="headline">Pasien</div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col v-for="(card,i) in cards" :key="i" cols="12" sm="3">
              <v-card>
                <v-card-text class="text-center">
                  <p>
                    <v-icon size="30">{{card.icon}}</v-icon>
                  </p>
                  <div class="display-1 font-weight-bold">{{card.value}}</div>
                  <div class="caption">{{card.title}}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <!-- Pasien Chart -->
        <v-col cols="12">

        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {title: 'Pasien hari ini', value: '15', icon: 'fas fa-user-injured'},
        {title: 'Pasien terdaftar', value: '37', icon: 'fas fa-address-book'},
        {title: 'Terapis terdaftar', value: '4', icon: 'fas fa-user-md'}
      ]
    }
  }
}
</script>