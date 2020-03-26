<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog.additPasien" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">{{dialog.addPasien? 'Tambah Pasien':'Ubah Pasien'}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field label="Nama" v-model="currentPasien.nama"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <p>Jenis Kelamin</p>
                      <v-radio-group row v-model="currentPasien.jenis_kelamin">
                        <v-radio label="Laki-Laki" :value="true"></v-radio>
                        <v-radio label="Perempuan" :value="false"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field label="Alamat" v-model="currentPasien.alamat"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field label="Telepon" v-model="currentPasien.telp"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                          :items="$store.state.penyakit.map(x => x.nama)"
                          v-model="currentPasien.riwayat_penyakit"
                          attach
                          dense
                          small-chips
                          deletable-chips
                          multiple
                          label="Riwayat Penyakit"
                        ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog.additPasien = false">Batal</v-btn>
                <v-btn v-if="dialog.addPasien" color="blue darken-1" @click="addPasien" text>Tambah</v-btn>
                <v-btn v-else color="blue darken-1" @click="editPasien" text>Ubah</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog.deletePasien" persistent max-width="500px">
            <v-card>
              <v-card-text class="pt-4 px-6 pb-3 title font-weight-medium">Apakah anda yakin akan menghapus data ini?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog.deletePasien = false">Tidak</v-btn>
                <v-btn color="red darken-1" text @click="deletePasien">Ya</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card>
            <v-card-text class="px-6">
              <v-data-table
                :headers="headers"
                :items="$store.state.pasien"
                :search="search.cariNama"
                loading-text="Memuat data"
                no-data-text="Tidak ada data"
                no-results-text="Pencarian tidak ditemukan"
              >
                <template v-slot:top>
                  <v-row justify="end">
                    <v-col cols="12">
                      <div class="headline font-weight-medium">Daftar Pasien</div>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="search.cariNama"
                        append-icon="fas fa-user-tag"
                        label="Cari Nama"
                        single-line
                        hide-details
                        dense
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="search.cariAlamat"
                        append-icon="fas fa-home"
                        label="Cari Alamat"
                        single-line
                        hide-details
                        dense
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-btn color="primary" elevation="0" @click="dialogAdd" block><v-icon left>fas fa-plus</v-icon> Tambah Pasien</v-btn>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.riwayat_penyakit={item}>
                  <v-chip class="ma-1" small v-for="(rp, i) in item.riwayat_penyakit" :key="i">{{rp}}</v-chip>
                </template>
                <template v-slot:item.jenis_kelamin={item}>
                  {{ item.jenis_kelamin ? 'Laki-Laki':'Perempuan'}}
                </template>
                <template v-slot:item.action={item}>
                  <v-btn color="success" small @click="pasienDetail(item)">
                    <v-icon x-small>fas fa-notes-medical</v-icon>
                  </v-btn>
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
        additPasien: false,
        hapusPasien: false,
        addPasien: false
      },
      search: {
        cariNama: '',
        cariPenyakit: '',
        cariAlamat: ''
      },
      currentPasien: {},
      headers: [
        { text: 'Nama', value: 'nama' },
        { text: 'Jenis Kelamin', value: 'jenis_kelamin', sortable: false },
        { text: 'Alamat', value: 'alamat', sortable: false, filter: value => {
          if(!this.search.cariAlamat) return true
          return value.includes(this.search.cariAlamat)
        }},
        { text: 'Telepon', value: 'telp', sortable: false },
        { text: 'Riwayat Penyakit', value: 'riwayat_penyakit', sortable: false },
        { text: 'Aksi', value: 'action', width: 210, align: 'end', sortable: false }
      ]
    }
  },
  async fetch({$axios, store}){
    let pasien = await $axios.$get('/pasien')
    store.commit('setPasien', pasien.data)
    let penyakit = await $axios.$get('/penyakit')
    store.commit('setPenyakit', penyakit.data)
    // let pasienUpdate = await $axios.$post('/databaru', {model: 'pasien'})
    // if(!store.state.pasien.length || pasienUpdate.data.hash != store.state.update['pasien']){
    //   let pasien = await $axios.$get('/pasien')
    //   store.commit('setPasien', pasien.data)
    //   store.commit('setUpdate', pasienUpdate.data)
    // }
    // let penyakitUpdate = await $axios.$post('/databaru', {model: 'penyakit'})
    // if(!store.state.penyakit.length || penyakitUpdate.data.hash != store.state.update['penyakit']){
    //   let penyakit = await $axios.$get('/penyakit')
    //   store.commit('setPenyakit', penyakit.data)
    //   store.commit('setUpdate', penyakitUpdate.data)
    // }
  },
  methods: {
    pasienDetail(item){
      this.$router.push('/pasien/'+item._id)
    },
    dialogAdd(){
      this.currentPasien = {}
      this.dialog.addPasien = true
      this.dialog.additPasien = true
    },
    dialogEdit(item){
      this.currentPasien = JSON.parse(JSON.stringify(item))
      this.dialog.addPasien = false
      this.dialog.additPasien = true
    },
    dialogDelete(item){
      this.currentPasien = JSON.parse(JSON.stringify(item))
      this.dialog.deletePasien = true
    },
    async addPasien(){
      try {
        await this.$axios.$post('/pasien', {pasien: this.currentPasien})
        let pasien = await this.$axios.$get('/pasien')
        this.$store.commit('setPasien', pasien.data)
        this.dialog.additPasien = false
      }catch (e){
        console.log(e)
      }
    },
    async editPasien(){
      try {
        let id = this.currentPasien._id
        delete this.currentPasien._id
        await this.$axios.$post('/pasien/u', {condition: {_id: id}, update: this.currentPasien})
        let pasien = await this.$axios.$get('/pasien')
        this.$store.commit('setPasien', pasien.data)
        this.dialog.additPasien = false
      }catch (e){
        console.log(e)
      }
    },
    async deletePasien(){
      try {
        await this.$axios.$post('/pasien/d', {condition: {_id: this.currentPasien._id}})
        let pasien = await this.$axios.$get('/pasien')
        this.$store.commit('setPasien', pasien.data)
        this.dialog.hapusPasien = false
      }catch (e){
        console.log(e)
      }
    }
  }
}
</script>