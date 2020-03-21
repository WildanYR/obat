export const state = () => ({
  pasien: [],
  terapis: [],
  keluhan: [],
  herbal: [],
  penyakit: [],
  update: {}
})

export const mutations = {
  setPasien(state, pasien) {
    state.pasien = pasien
  },
  setTerapis(state, terapis) {
    state.terapis = terapis
  },
  setKeluhan(state, keluhan) {
    state.keluhan = keluhan
  },
  setHerbal(state, herbal) {
    state.herbal = herbal
  },
  setPenyakit(state, penyakit) {
    state.penyakit = penyakit
  },
  setRekamMedis(state, {index, rekam_medis}){
    state.pasien[index].rekam_medis = rekam_medis
  },
  setUpdate(state, update){
    state.update[update.model] = update.hash
  }
}