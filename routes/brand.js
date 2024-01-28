const express = require('express')
const _auth = require('../middleware/authorization');
const _brand = require('../controller/brand');
const { upload } = require('../middleware/image');
const router = express.Router()

router.post("/create", upload ,_brand.create);

module.exports= router;