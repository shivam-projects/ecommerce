const express = require('express')
const _auth = require('../middleware/authorization');
const _brand = require('../controller/brand');
const router = express.Router()

router.post("/create", _auth.verifyToken, _brand.create);

module.exports= router;