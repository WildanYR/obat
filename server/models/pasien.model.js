const mongoose = require('mongoose')

const PasienSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  jenis_kelamin: {
    type: Boolean,
    required: true
  },
  alamat: String,
  telp: String,
  riwayat_penyakit: [String],
  rekam_medis: [{
    tanggal: String,
    terapis: String,
    keluhan: [String],
    herbal: [String],
    keterangan: String
  }]
})

module.exports = mongoose.model('Pasien', PasienSchema, 'pasien')