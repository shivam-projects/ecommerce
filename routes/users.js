const express = require('express')
const _user = require('../controller/user');
const  {upload}  = require('../middleware/image');
const _auth = require('../middleware/authorization');
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Get User By ID
// router.get("/", _auth.verifyToken, _user.getUserById);

// Sign Up with Post Operation
router.post("/signup",upload, _user.signUp);

// Sign In with Post Operation
router.post("/signin", _user.singIn);

// Delete id with the help of delete operation
router.delete("/delete/:id", _auth.verifyToken, _user.deleteById);

// Update id with the help of Update operation
router.put("/update", _auth.verifyToken, upload, _user.updateWithId);

//Verification with the help of OTP
router.post("/verify", _user.verification);

//Resend OTP
router.post("/resend/:id", _user.resend)

//Logout User
router.get("/logout", _user.logout);

module.exports = router;