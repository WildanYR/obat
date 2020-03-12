const keluhanModel = require('../models/keluhan.model')
const response = require('../utils/response')

const get = (req, res) => {
  let condition = req.query
  keluhanModel.find(condition, (err, data) => {
    if(err) return response.error(res, err)
    return response.success(res, data)
  }).select('-__v')
}

const create = (req, res) => {
  let keluhan = req.body.keluhan
  keluhanModel.create(keluhan, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data keluhan berhasil disimpan')
  })
}

const update = (req, res) => {
  let condition = req.body.condition
  let update = req.body.update
  keluhanModel.updateMany(condition, update, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data keluhan berhasil diubah')
  })
}

const destroy = (req, res) => {
  let condition = req.body.condition
  keluhanModel.deleteMany(condition, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data keluhan berhasil dihapus')
  })
}

module.exports = {
  get,
  create,
  update,
  destroy
}