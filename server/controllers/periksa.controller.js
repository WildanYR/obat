const pasienModel = require('../models/pasien.model')
const kedatanganModel = require('../models/kedatangan.model')
const response = require('../utils/response')
const databaru = require('../utils/databaseUpdate')

const get = (req, res) => {
  let pasienID = req.body.id
  pasienModel.findById(pasienID, (err, data) => {
    if(err) return response.error(res, err)
    return response.success(res, data)
  }).select('rekam_medis')
}

const add = (req, res) => {
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

const update = (req, res) => {
  let pasienID = req.body.id
  let tanggal = req.body.tanggal
  
}

const destroy = (req, res) => {

}

module.exports = {
  get,
  add,
  update,
  destroy
}