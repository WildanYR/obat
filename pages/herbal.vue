<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog.additHerbal" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{dialog.addHerbal? 'Tambah Herbal':'Ubah Herbal'}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Herbal" v-model="currentHerbal.nama"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog.additHerbal = false">Batal</v-btn>
                <v-btn v-if="dialog.addHerbal" color="blue darken-1" text @click="addHerbal">Tambah</v-btn>
                <v-btn v-else color="blue darken-1" text @click="editHerbal">Ubah</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog.hapusHerbal" persistent max-width="500px">
            <v-card>
              <v-card-text class="pt-4 px-6 pb-3 title font-weight-medium">Apakah anda yakin akan menghapus herbal ini?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog.hapusHerbal = false">Tidak</v-btn>
                <v-btn color="red darken-1" text @click="deleteHerbal">Ya</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card>
            <v-card-text class="px-6">
              <v-data-table
                :headers="headers"
                :items="$store.state.herbal"
                :search="cariHerbal"
                loading-text="Memuat data"
                no-data-text="Tidak ada data"
                no-results-text="Pencarian tidak ditemukan"
              >
                <template v-slot:top>
                  <v-row justify="end">
                    <v-col cols="12">
                      <div class="headline font-weight-medium">Daftar Herbal</div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="cariHerbal"
                        append-icon="fas fa-user-tag"
                        label="Cari Herbal"
                        single-line
                        hide-details
                        dense
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-btn color="primary" elevation="0" @click="dialogAdd" block><v-icon left>fas fa-plus</v-icon> Tambah Herbal</v-btn>
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
        additHerbal: false,
        addHerbal: false,
        hapusHerbal: false
      },
      cariHerbal: '',
      currentHerbal: {},
      headers: [
        { text: 'Nama', value: 'nama' },
        { text: 'Aksi', value: 'action', width: 140, align: 'end', sortable: false }
      ]
    }
  },
  async fetch({$axios, store}){
     let herbal = await $axios.$get('/herbal')
    store.commit('setHerbal', herbal.data)
    // let herbalUpdate = await $axios.$post('/databaru', {model: 'herbal'})
    // if(!store.state.herbal.length || herbalUpdate.data.hash != store.state.update['herbal']){
    //   let herbal = await $axios.$get('/herbal')
    //   store.commit('setHerbal', herbal.data)
    //   store.commit('setUpdate', herbalUpdate.data)
    // }
  },
  methods: {
    dialogAdd(){
      this.currentHerbal = {}
      this.dialog.addHerbal = true
      this.dialog.additHerbal = true
    },
    dialogEdit(item){
      this.currentHerbal = JSON.parse(JSON.stringify(item))
      this.dialog.addHerbal = false
      this.dialog.additHerbal = true
    },
    dialogDelete(item){
      this.currentHerbal = JSON.parse(JSON.stringify(item))
      this.dialog.hapusHerbal = true
    },
    async addHerbal(){
      try {
        await this.$axios.$post('/herbal', {herbal: this.currentHerbal})
        let herbal = await this.$axios.$get('/herbal')
        this.$store.commit('setHerbal', herbal.data)
        this.dialog.additHerbal = false
      }catch (e){
        console.log(e)
      }
    },
    async editHerbal(){
      try {
        let id = this.currentHerbal._id
        delete this.currentHerbal._id
        await this.$axios.$post('/herbal/u', {condition: {_id: id}, update: this.currentHerbal})
        let herbal = await this.$axios.$get('/herbal')
        this.$store.commit('setHerbal', herbal.data)
        this.dialog.additHerbal = false
      }catch (e){
        console.log(e)
      }
    },
    async deleteHerbal(){
      try {
        await this.$axios.$post('/herbal/d', {condition: {_id: this.currentHerbal._id}})
        let herbal = await this.$axios.$get('/herbal')
        this.$store.commit('setHerbal', herbal.data)
        this.dialog.hapusHerbal = false
      }catch (e){
        console.log(e)
      }
    }
  }
}
</script>