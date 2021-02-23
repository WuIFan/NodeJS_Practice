var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/modify_controller.js');
memberModifyMethod = new MemberModifyMethod();

router.post('/', function(req, res, next) {
  console.log(req.body.test);
  res.end()
});

router.post('/register', memberModifyMethod.postRegister);
router.post('/login', memberModifyMethod.postLogin);

router.put('/update', memberModifyMethod.putUpdate);

module.exports = router;
