const express = require('express');
const customerController = require('../controllers/customer.controller');
const router = express.Router()



router.get('/', customerController.getAll)
router.get('/:id', customerController.getProductById)
router.post('/', customerController.create)
router.post('/:id', customerController.update)
router.delete('/:id', customerController.destroy)


module.exports = router;