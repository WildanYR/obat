const pasienModel = require('../models/pasien.model')
const kedatanganModel = require('../models/kedatangan.model')
const response = require('../utils/response')
const databaru = require('../utils/databaseUpdate')

const riwayat = (req, res) => {
  let pasienID = req.body.id
  pasienModel.findById(pasienID, (err, data) => {
    if(err) return response.error(res, err)
    return response.success(res, data)
  }).select('_id rekam_medis')
}

const periksa = (req, res) => {
  let pasienID = req.body.id
  let periksa = req.body.periksa
  let tanggal = new Date()
  tanggal.setHours(0,0,0,0)
  tanggal = tanggal.toString()
  periksa.tanggal = tanggal
  pasienModel.updateOne({_id: pasienID}, {$push: {rekam_medis: periksa}}, (err) => {
    if(err) return response.error(res, err)
    kedatanganModel.findOneAndUpdate({tanggal: tanggal}, {$inc: {jumlah: 1}}, {upsert: true, new: true, setDefaultsOnInsert: true}, (err) => {
      if(err) return response.error(res, err)
      databaru.update('pasien', (err) => {
        if(err) return response.error(res, err)
      })
      return response.success(res, 'data periksa berhasil disimpan')
    })
  })
}

module.exports = {
  riwayat,
  periksa
}