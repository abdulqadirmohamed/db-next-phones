const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router()



router.get('/', productController.getAll)
router.get('/total', productController.totalProducts)
router.get('/:id', productController.getProductById)
router.post('/', productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.destroy)


module.exports = router;