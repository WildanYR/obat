<template>
  <v-layout v-if="!$store.state.pasien[pasienIndex]" fill-height justify-center align-center>
    <div class="display-1 grey--text text--lighten-1">Pasien tidak ditemukan</div>
  </v-layout>
  <v-layout v-else>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Detail Pasien</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="12" md="6">
                      <p>Nama</p>
                      <v-text-field :value="$store.state.pasien[pasienIndex].nama"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <p>Jenis Kelamin</p>
                      <v-radio-group row :value="$store.state.pasien[pasienIndex].jenis_kelamin">
                        <v-radio label="Laki-Laki" :value="true"></v-radio>
                        <v-radio label="Perempuan" :value="false"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="6">
                      <p>Alamat</p>
                      <v-text-field :value="$store.state.pasien[pasienIndex].alamat"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <p>Telepon</p>
                      <v-text-field :value="$store.state.pasien[pasienIndex].telp"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <p>Riwayat Penyakit</p>
                      <v-select
                          :items="$store.state.penyakit"
                          attach
                          chips
                          deletable-chips
                          multiple
                          :value="$store.state.pasien[pasienIndex].riwayat_penyakit"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" offset="0" md="3" offset-md="6">
                      <v-btn color="warning" elevation="0" block>Ubah data pasien</v-btn>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-btn color="error" elevation="0" block>Hapus data pasien</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-text class="px-6">
              <v-data-table
                :headers="headers"
                :items="$store.state.pasien[pasienIndex].rekam_medis"
                loading-text="Memuat data"
                no-data-text="Tidak ada data"
                no-results-text="Pencarian tidak ditemukan"
              >
                <template v-slot:top>
                  <v-row justify="end">
                    <v-col cols="12">
                      <div class="headline font-weight-medium">Rekam Medis</div>
                    </v-col>
                    <!-- date selector, add new -->
                  </v-row>
                </template>
                <template v-slot:item.tanggal={item}>{{showTanggal(item)}}</template>
                <template v-slot:item.keteranganStat={item}>
                  <v-btn v-if="item.keterangan" elevation="0" color="primary" small>Lihat Keterangan</v-btn>
                  <span v-else>Tidak ada keterangan</span>
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
      pasienIndex: this.$store.state.pasien.findIndex(x => x.id == this.$route.params.id),
      headers: [
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Terapis', value: 'terapis' },
        { text: 'Keluhan', value: 'keluhan', sortable: false },
        { text: 'Rekomendasi Herbal', value: 'herbal', sortable: false },
        { text: 'Keterangan', value: 'keteranganStat', sortable: false }
      ]
    }
  },
  fetch({store, route}) {
    let index = store.state.pasien.findIndex(x => x.id == route.params.id)
    let rekam_medis = [
      {
        tanggal: 'Fri Feb 08 2019 07:00:00 GMT+0700 (Western Indonesia Time)',
        terapis: 'Joko',
        keluhan: [],
        herbal: [],
        keterangan: 'hai patrick'
      },
      {
        tanggal: 'Thu Mar 07 2019 07:00:00 GMT+0700 (Western Indonesia Time)',
        terapis: 'Heru',
        keluhan: [],
        herbal: [],
        keterangan: ''
      },
      {
        tanggal: 'Thu May 09 2019 07:00:00 GMT+0700 (Western Indonesia Time)',
        terapis: 'Joko',
        keluhan: [],
        herbal: [],
        keterangan: ''
      }
    ]
    if (index != undefined){
      if(store.state.pasien[index].rekam_medis == undefined || !store.state.pasien[index].rekam_medis.length){
        store.commit('setRekamMedis', {index, rekam_medis})
      }
    }
  },
  methods: {
    showTanggal(item){
      let tgl = new Date(item.tanggal)
      return tgl.getDate()+' '+tgl.toLocaleString('id', {month: 'long'})+' '+tgl.getFullYear()
    }
  }
}
</script>