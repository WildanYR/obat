export const state = () => ({
  pasien: [],
  terapis: [],
  keluhan: [],
  herbal: [],
  penyakit: [],
  medis: {}
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
  setMedis(state, {pasienID, medis}) {
    state.medis[pasienID] = medis
  }
}