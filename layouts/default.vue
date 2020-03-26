<template>
  <v-app :dark="setTheme">
    <!-- Appbar -->
    <v-app-bar dense app flat clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>
        OBat
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="dark = !dark">
        <v-icon>{{dark ? "fas fa-sun": "fas fa-moon"}}</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Navigation Drawer -->
    <v-navigation-drawer app clipped v-model="drawer">
      <v-list dense nav class="mt-7">
        <v-list-item v-for="(nav,i) in navs" :key="`nav-${i}`" nuxt :to="nav.to">
          <v-list-item-icon>
            <v-icon>{{ nav.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{nav.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <!-- Content -->
      <nuxt />
      <!-- Footer -->
      <v-footer absolute padless class="mt-3">
        <v-container>
          <div class="d-flex justify-end body-2">Versi 1.0.0</div>
        </v-container>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      dark: false,
      navs: [
        //{title: 'Dashboard', to: '/', icon: 'fas fa-home'},
        {title: 'Pasien', to: '/pasien', icon: 'fas fa-user-injured'},
        {title: 'Terapis', to: '/terapis', icon: 'fas fa-user-md'},
        {title: 'Keluhan', to: '/keluhan', icon: 'fas fa-comment-medical'},
        {title: 'Herbal', to: '/herbal', icon: 'fas fa-capsules'},
        {title: 'Penyakit', to: '/penyakit', icon: 'fas fa-diagnoses'}
      ]
    }
  },
  computed: {
    setTheme() {
      if(this.dark){
        return (this.$vuetify.theme.dark = true)
      }else{
        return (this.$vuetify.theme.dark = false)
      }
    }
  }
}
</script>