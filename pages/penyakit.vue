<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog.additPenyakit" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{dialog.addPenyakit? 'Tambah Penyakit':'Ubah Penyakit'}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Penyakit" v-model="currentPenyakit.nama"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog.additPenyakit = false">Batal</v-btn>
                <v-btn v-if="dialog.addPenyakit" color="blue darken-1" text>Tambah</v-btn>
                <v-btn v-else color="blue darken-1" text>Ubah</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog.hapusPenyakit" persistent max-width="500px">
            <v-card>
              <v-card-text class="pt-4 px-6 pb-3 title font-weight-medium">Apakah anda yakin akan menghapus penyakit ini?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog.hapusPenyakit = false">Tidak</v-btn>
                <v-btn color="red darken-1" text>Ya</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card>
            <v-card-text class="px-6">
              <v-data-table
                :headers="headers"
                :items="$store.state.penyakit"
                :search="cariPenyakit"
                loading-text="Memuat data"
                no-data-text="Tidak ada data"
                no-results-text="Pencarian tidak ditemukan"
              >
                <template v-slot:top>
                  <v-row justify="end">
                    <v-col cols="12">
                      <div class="headline font-weight-medium">Daftar Penyakit</div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="cariPenyakit"
                        append-icon="fas fa-user-tag"
                        label="Cari Penyakit"
                        single-line
                        hide-details
                        dense
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-btn color="primary" elevation="0" @click="dialogAdd" block><v-icon left>fas fa-plus</v-icon> Tambah Penyakit</v-btn>
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
        additPenyakit: false,
        addPenyakit: false,
        hapusPenyakit: false
      },
      cariPenyakit: '',
      currentPenyakit: {},
      headers: [
        { text: 'Nama', value: 'penyakit' },
        { text: 'Aksi', value: 'action', width: 140, align: 'end', sortable: false }
      ]
    }
  },
  fetch({store}){
    
  },
  methods: {
    dialogAdd(){
      this.currentPenyakit = {}
      this.dialog.addPenyakit = true
      this.dialog.additPenyakit = true
    },
    dialogEdit(item){
      this.currentPenyakit = JSON.parse(JSON.stringify(item))
      this.dialog.addPenyakit = false
      this.dialog.additPenyakit = true
    },
    dialogDelete(item){
      this.currentPenyakit = JSON.parse(JSON.stringify(item))
      this.dialog.hapusPenyakit = true
    }
  }
}
</script>