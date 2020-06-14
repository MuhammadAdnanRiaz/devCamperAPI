const express = require('express')
const router = express.Router()
const {
    getBootcamp,
    getBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsWithRadius
} = require('../controllers/bootcamps')

//import external resource
var courseRouter = require('./courses')

//re-route to external router
router.use('/:bootcamp/courses', courseRouter)

router.route('/radius/:postCode/:distance').get(getBootcampsWithRadius)
router.route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)

module.exports = router