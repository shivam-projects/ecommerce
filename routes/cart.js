const express = require('express')
const _auth = require('../middleware/authorization');
const _cart = require('../controller/cart');
const router = express.Router()

router.post("/create/:productId", _auth.verifyToken, _cart.create);
router.get("/getcart", _auth.verifyToken, _cart.getCart);

router.post("/increase", _auth.verifyToken, _cart.increase);
router.post("/decrease", _auth.verifyToken, _cart.decrease);
module.exports= router;