const express = require('express');
var router = express.Router();
var controller = require('../controllers/veiw');
var auth = require('../config/auth/auth');
// router 
 router.get('/signup',auth.getSignup);
 router.get('/logout',auth.getLogout);
 router.post('/login',auth.postLogin);
 router.post('/signup',auth.postSignup);


module.exports = router;