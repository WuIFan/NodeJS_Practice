var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/modify_controller.js');
memberModifyMethod = new MemberModifyMethod();

router.post('/', function(req, res, next) {
  console.log(req.body.test);
});

router.post('/register', memberModifyMethod.postRegister);

module.exports = router;
