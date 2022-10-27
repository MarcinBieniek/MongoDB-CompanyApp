const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getAll);
router.get('/products/:id', ProductController.getById);
router.post('/products', ProductController.postDoc);
router.put('/products/:id', ProductController.putDoc);
router.delete('/products/:id', ProductController.deleteDoc);

module.exports = router;
