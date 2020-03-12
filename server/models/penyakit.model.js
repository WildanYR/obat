const mongoose = require('mongoose')

const PenyakitSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Penyakit', PenyakitSchema, 'penyakit')