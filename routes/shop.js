const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// below is dynamic routes, please put it on the very bottom of parent (/product/..) path
// because dynamic routes will be fired first and other route with the same parent path will not reached
router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/cart', isAuth, shopController.postCart);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

module.exports = router;
