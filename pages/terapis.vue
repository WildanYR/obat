<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog.additTerapis" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{dialog.addTerapis? 'Tambah Terapis':'Ubah Terapis'}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Nama" v-model="currentTerapis.nama"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog.additTerapis = false">Batal</v-btn>
                <v-btn v-if="dialog.addTerapis" color="blue darken-1" text @click="addTerapis">Tambah</v-btn>
                <v-btn v-else color="blue darken-1" text @click="editTerapis">Ubah</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog.hapusTerapis" persistent max-width="500px">
            <v-card>
              <v-card-text class="pt-4 px-6 pb-3 title font-weight-medium">Apakah anda yakin akan menghapus terapis ini?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog.hapusTerapis = false">Tidak</v-btn>
                <v-btn color="red darken-1" text @click="deleteTerapis">Ya</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card>
            <v-card-text class="px-6">
              <v-data-table
                :headers="headers"
                :items="$store.state.terapis"
                :search="cariTerapis"
                loading-text="Memuat data"
                no-data-text="Tidak ada data"
                no-results-text="Pencarian tidak ditemukan"
              >
                <template v-slot:top>
                  <v-row justify="end">
                    <v-col cols="12">
                      <div class="headline font-weight-medium">Daftar Terapis</div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="cariTerapis"
                        append-icon="fas fa-user-tag"
                        label="Cari Terapis"
                        single-line
                        hide-details
                        dense
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-btn color="primary" elevation="0" @click="dialogAdd" block><v-icon left>fas fa-plus</v-icon> Tambah Terapis</v-btn>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.action={item}>
                  <v-btn color="warning" small @click="dialogEdit(item)">
                    <v-icon x-small>fas fa-edit</v-icon>
                  </v-btn>
                  <v-btn color="error" small @click="dialogDelete(item)">
                    <v-icon x-small>fas fa-trash-alt</v-icon>
                  </v-btn>
                </template>
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
      dialog: {
        additTerapis: false,
        addTerapis: false,
        hapusTerapis: false
      },
      cariTerapis: '',
      currentTerapis: {},
      headers: [
        { text: 'Nama', value: 'nama' },
        { text: 'Aksi', value: 'action', width: 140, align: 'end', sortable: false }
      ]
    }
  },
  async fetch({$axios, store}){
    let terapis = await $axios.$get('/terapis')
    store.commit('setTerapis', terapis.data)
    // let terapisUpdate = await $axios.$post('/databaru', {model: 'terapis'})
    // if(!store.state.terapis.length || terapisUpdate.data.hash != store.state.update['terapis']){
    //   let terapis = await $axios.$get('/terapis')
    //   store.commit('setTerapis', terapis.data)
    //   store.commit('setUpdate', terapisUpdate.data)
    // }
  },
  methods: {
    dialogAdd(){
      this.currentTerapis = {}
      this.dialog.addTerapis = true
      this.dialog.additTerapis = true
    },
    dialogEdit(item){
      this.currentTerapis = JSON.parse(JSON.stringify(item))
      this.dialog.addTerapis = false
      this.dialog.additTerapis = true
    },
    dialogDelete(item){
      this.currentTerapis = JSON.parse(JSON.stringify(item))
      this.dialog.hapusTerapis = true
    },
    async addTerapis(){
      try {
        await this.$axios.$post('/terapis', {terapis: this.currentTerapis})
        let terapis = await this.$axios.$get('/terapis')
        this.$store.commit('setTerapis', terapis.data)
        this.dialog.additTerapis = false
      }catch (e){
        console.log(e)
      }
    },
    async editTerapis(){
      try {
        let id = this.currentTerapis._id
        delete this.currentTerapis._id
        await this.$axios.$post('/terapis/u', {condition: {_id: id}, update: this.currentTerapis})
        let terapis = await this.$axios.$get('/terapis')
        this.$store.commit('setTerapis', terapis.data)
        this.dialog.additTerapis = false
      }catch (e){
        console.log(e)
      }
    },
    async deleteTerapis(){
      try {
        await this.$axios.$post('/terapis/d', {condition: {_id: this.currentTerapis._id}})
        let terapis = await this.$axios.$get('/terapis')
        this.$store.commit('setTerapis', terapis.data)
        this.dialog.hapusTerapis = false
      }catch (e){
        console.log(e)
      }
    }
  }
}
</script>