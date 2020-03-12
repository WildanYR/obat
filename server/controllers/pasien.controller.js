const pasienModel = require('../models/pasien.model')
const response = require('../utils/response')

const get = (req, res) => {
  let condition = req.query
  pasienModel.find(condition, (err, data) => {
    if(err) return response.error(res, err)
    return response.success(res, data)
  }).select('-rekam_medis -__v')
}

const create = (req, res) => {
  let pasien = req.body.pasien
  pasienModel.create(pasien, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data pasien berhasil disimpan')
  })
}

const update = (req, res) => {
  let condition = req.body.condition
  let update = req.body.update
  pasienModel.updateMany(condition, update, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data pasien berhasil diubah')
  })
}

const destroy = (req, res) => {
  let condition = req.body.condition
  pasienModel.deleteMany(condition, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data pasien berhasil dihapus')
  })
}

module.exports = {
  get,
  create,
  update,
  destroy
}