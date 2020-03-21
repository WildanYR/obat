const router = require('express').Router()

const herbalRoute = require('./herbal.route')
const keluhanRoute = require('./keluhan.route')
const pasienRoute = require('./pasien.route')
const penyakitRoute = require('./penyakit.route')
const periksaRoute = require('./periksa.route')
const terapisRoute = require('./terapis.route')
const databaruRoute = require('./databaru.route')

router.use('/herbal', herbalRoute)
router.use('/keluhan', keluhanRoute)
router.use('/pasien', pasienRoute)
router.use('/penyakit', penyakitRoute)
router.use('/periksa', periksaRoute)
router.use('/terapis', terapisRoute)
router.use('/databaru', databaruRoute)

module.exports = router