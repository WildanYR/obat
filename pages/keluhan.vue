<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog.additKeluhan" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{dialog.addKeluhan? 'Tambah Keluhan':'Ubah Keluhan'}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Keluhan" v-model="currentKeluhan.nama"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog.additKeluhan = false">Batal</v-btn>
                <v-btn v-if="dialog.addKeluhan" color="blue darken-1" text>Tambah</v-btn>
                <v-btn v-else color="blue darken-1" text>Ubah</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog.hapusKeluhan" persistent max-width="500px">
            <v-card>
              <v-card-text class="pt-4 px-6 pb-3 title font-weight-medium">Apakah anda yakin akan menghapus keluhan ini?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog.hapusKeluhan = false">Tidak</v-btn>
                <v-btn color="red darken-1" text>Ya</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card>
            <v-card-text class="px-6">
              <v-data-table
                :headers="headers"
                :items="$store.state.keluhan"
                :search="cariKeluhan"
                loading-text="Memuat data"
                no-data-text="Tidak ada data"
                no-results-text="Pencarian tidak ditemukan"
              >
                <template v-slot:top>
                  <v-row justify="end">
                    <v-col cols="12">
                      <div class="headline font-weight-medium">Daftar Keluhan</div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="cariKeluhan"
                        append-icon="fas fa-user-tag"
                        label="Cari Keluhan"
                        single-line
                        hide-details
                        dense
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-btn color="primary" elevation="0" @click="dialogAdd" block><v-icon left>fas fa-plus</v-icon> Tambah Keluhan</v-btn>
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
        additKeluhan: false,
        addKeluhan: false,
        hapusKeluhan: false
      },
      cariKeluhan: '',
      currentKeluhan: {},
      headers: [
        { text: 'Nama', value: 'nama' },
        { text: 'Aksi', value: 'action', width: 140, align: 'end', sortable: false }
      ]
    }
  },
  async fetch({$axios, store}){
    let keluhanUpdate = await $axios.$post('/databaru', {model: 'keluhan'})
    if(!store.state.keluhan.length || keluhanUpdate.data.hash != store.state.update['keluhan']){
      let keluhan = await $axios.$get('/keluhan')
      store.commit('setKeluhan', keluhan.data)
      store.commit('setUpdate', keluhanUpdate.data)
    }
  },
  methods: {
    dialogAdd(){
      this.currentKeluhan = {}
      this.dialog.addKeluhan = true
      this.dialog.additKeluhan = true
    },
    dialogEdit(item){
      this.currentKeluhan = JSON.parse(JSON.stringify(item))
      this.dialog.addKeluhan = false
      this.dialog.additKeluhan = true
    },
    dialogDelete(item){
      this.currentKeluhan = JSON.parse(JSON.stringify(item))
      this.dialog.hapusKeluhan = true
    }
  }
}
</script>