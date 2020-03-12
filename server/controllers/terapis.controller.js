const terapisModel = require('../models/terapis.model')
const response = require('../utils/response')

const get = (req, res) => {
  let condition = req.query
  terapisModel.find(condition, (err, data) => {
    if(err) return response.error(res, err)
    return response.success(res, data)
  }).select('-__v')
}

const create = (req, res) => {
  let terapis = req.body.terapis
  terapisModel.create(terapis, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data terapis berhasil disimpan')
  })
}

const update = (req, res) => {
  let condition = req.body.condition
  let update = req.body.update
  terapisModel.updateMany(condition, update, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data terapis berhasil diubah')
  })
}

const destroy = (req, res) => {
  let condition = req.body.condition
  terapisModel.deleteMany(condition, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data terapis berhasil dihapus')
  })
}

module.exports = {
  get,
  create,
  update,
  destroy
}