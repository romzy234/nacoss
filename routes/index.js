const express = require('express');
var router = express.Router();
var path = require('path');
var controller = require('../controllers/veiw');
var controller2 = require('../controllers/student');
var controller3 = require('../controllers/pdf');
var auth = require('../config/auth/auth');

var checkSignIn = require('../middleware/checker');
// router 
// get routers
 router.get('/index',controller.getIndex);
 router.get('/',controller.getIndex);
 router.get('/pay',controller.getPay);
 router.get('/admin/upload',checkSignIn, controller2.getUpload);
 router.get('/pdf.pdf',checkSignIn,controller3.test);
 router.get('/admin/home',checkSignIn, controller.getAdmin);
 router.get('/admin/all', checkSignIn, controller.getAll);
 router.get('/admin/level/paystack/:id', checkSignIn, controller.getlevel);
 router.get('/admin/level/cash/:id', checkSignIn, controller.getCash);
 router.get('/admin/export_nacoss.json',checkSignIn, controller.getBackup);
 router.get('/admin/paid/:id', checkSignIn,controller.getparam);
 router.get('/admin/search',checkSignIn, controller.getSearch);
 router.get('/admin', auth.getLogin);
//post routers
 router.post('/data', checkSignIn, controller2.Pays);
 router.post("/webhook/url", controller.postPay);
 router.post('/admin/search', checkSignIn, controller.postSearch);

module.exports = router;