const express = require('express');
const paymentController = require('../controllers/payment.controller');
const router = express.Router()

router.get('/', paymentController.getAll)
router.get('/:id', paymentController.getPaymentsById)

router.post('/', paymentController.create)
router.post('/:id', paymentController.update)


module.exports = router