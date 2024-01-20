const express = require('express')
const _auth = require('../middleware/authorization');
const _payment = require('../controller/payment');
const router = express.Router()


// router.post('/customer/:orderId', _payment.createCustomer)
// router.post('/token', _payment.token)

module.exports = router;
