const express = require('express');
const _auth = require('../middleware/authorization');
const _order = require('../controller/order');
const router = express.Router()

router.post('/create/:cartId', _auth.verifyToken, _order.order)
router.put('/update/:orderId', _auth.verifyToken, _order.update)

module.exports= router;