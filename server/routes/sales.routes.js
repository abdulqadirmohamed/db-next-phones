
const express = require('express');
const salesController = require('../controllers/sales.controller');
const router = express.Router()

router.get('/', salesController.getAll)

router.get('/total', salesController.totalSales)
router.get('/todaysales', salesController.totalSalesToday)

router.get('/:id', salesController.getSaleById)

router.post('/', salesController.create)
router.post('/:id', salesController.update)

router.delete('/:id', salesController.destroy)

module.exports = router