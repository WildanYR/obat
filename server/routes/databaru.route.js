const router = require('express').Router()
const databaruController = require('../controllers/databaru.controller')

router.post('/', databaruController.get)

module.exports = router