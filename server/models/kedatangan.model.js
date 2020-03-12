const mongoose = require('mongoose')

const KedatanganSchema = mongoose.Schema({
  tanggal: {
    type: String,
    required: true
  },
  jumlah: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Kedatangan', KedatanganSchema, 'kedatangan')