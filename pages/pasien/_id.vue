<template>
  <v-layout>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog.addMedis" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">Periksa</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                        <v-autocomplete
                          :items="$store.state.terapis.map(x => x.nama)"
                          v-model="currentMedis.terapis"
                          attach
                          dense
                          label="Terapis"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                          :items="$store.state.keluhan.map(x => x.nama)"
                          v-model="currentMedis.keluhan"
                          attach
                          dense
                          small-chips
                          deletable-chips
                          multiple
                          label="Keluhan"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                          :items="$store.state.herbal.map(x => x.nama)"
                          v-model="currentMedis.herbal"
                          attach
                          dense
                          small-chips
                          deletable-chips
                          multiple
                          label="Rekomendasi Herbal"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                      v-model="currentMedis.keterangan"
                        auto-grow
                        label="Keterangan"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog.addMedis = false">Batal</v-btn>
                <v-btn color="blue darken-1" @click="addMedis" text>Tambah</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card>
            <v-card-text class="px-6">
              <v-data-table
                :headers="headers"
                :items="$store.state.medis[currentPasien._id]"
                :search="cariTanggal"
                loading-text="Memuat data"
                no-data-text="Tidak ada data"
                no-results-text="Pencarian tidak ditemukan"
              >
                <template v-slot:top>
                  <v-row justify="end">
                    <v-col cols="12">
                      <div class="headline font-weight-medium">{{'Detail '+currentPasien.nama}}</div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="cariTanggal"
                        append-icon="fas fa-calendar"
                        label="Cari"
                        single-line
                        hide-details
                        dense
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-btn color="primary" elevation="0" block @click="dialog.addMedis = true"><v-icon left>fas fa-plus</v-icon> Tambah data</v-btn>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.keluhan={item}>
                  <v-chip class="ma-1" small v-for="(rp, i) in item.keluhan" :key="i">{{rp}}</v-chip>
                </template>
                <template v-slot:item.herbal={item}>
                  <v-chip class="ma-1" small v-for="(rp, i) in item.herbal" :key="i">{{rp}}</v-chip>
                </template>
                <template v-slot:item.tanggal={item}>
                  {{showTanggal(item.tanggal)}}
                </template>
                <!-- <template v-slot:item.action>
                  <v-btn color="error" small>
                    <v-icon x-small>fas fa-trash-alt</v-icon>
                  </v-btn>
                </template> -->
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data(){
    return {
      currentPasien: this.$store.state.pasien.find(x => x._id == this.$route.params.id),
      currentMedis: {},
      cariTanggal: '',
      dialog: {
        addMedis: false
      },
      headers: [
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Terapis', value: 'terapis', sortable: false },
        { text: 'Keluhan', value: 'keluhan', sortable: false },
        { text: 'Rekomendasi Herbal', value: 'herbal', sortable: false },
        { text: 'Keterangan', value: 'keterangan', sortable: false },
        //{ text: 'Aksi', value: 'action', width: 70, align: 'end', sortable: false }
      ]
    }
  },
  async fetch({$axios, store, route}){
    let pasienID = store.state.pasien.find(x => x._id == route.params.id)._id
    let medis = await $axios.$post('/periksa', {id: pasienID})
    store.commit('setMedis', {pasienID: pasienID, medis: medis.data.rekam_medis})
    let terapis = await $axios.$get('/terapis')
    store.commit('setTerapis', terapis.data)
    let keluhan = await $axios.$get('/keluhan')
    store.commit('setKeluhan', keluhan.data)
    let herbal = await $axios.$get('/herbal')
    store.commit('setHerbal', herbal.data)
  },
  methods: {
    async addMedis(){
      try{
        await this.$axios.$post('/periksa/a', {id: this.currentPasien._id, periksa: this.currentMedis})
        let medis = await this.$axios.$post('/periksa', {id: this.currentPasien._id})
        this.$store.commit('setMedis', {pasienID: this.currentPasien._id, medis: medis.data.rekam_medis})
        this.dialog.addMedis = false
      }catch(e){
        console.log(e)
      }
    },
    showTanggal(tanggal){
      let tgl = new Date(tanggal)
      return tgl.getDate().toString()+' '+tgl.toLocaleString('id', {month: 'long'})+' '+tgl.getFullYear().toString()
    }
  }
}
</script>

<style>

</style>