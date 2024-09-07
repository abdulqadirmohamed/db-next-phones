const express = require('express');
const debtController = require('../controllers/debt.controller');
const router = express.Router()

router.get('/', debtController.getAll)
router.get('/:id', debtController.getDebtById)

router.post('/', debtController.create)
router.post('/:id', debtController.update)


module.exports = router