const express = require('express')
const  {upload}  = require('../middleware/image');
const _auth = require('../middleware/authorization');
const _product = require('../controller/product');
const router = express.Router()


router.post('/create', _auth.verifyToken, upload, _product.createProduct);
router.put('/update/:id', upload,  _auth.verifyToken, _product.updateWithId)
router.get('/searching', _product.search)

module.exports = router;
