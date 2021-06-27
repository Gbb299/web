var express = require('express');
var router = express.Router();

const { list, signup, remove, signin, signout, isAuth } = require('../controllers/users')
const { auth } = require('../middlewares/auth')

/* GET users listing. */
router.post('/', auth, signup);
router.post('/signin', signin)

router.get('/', auth, list)
router.get('/signout', auth, signout)
router.get('/isAuth', isAuth)

router.delete('/', auth, remove)

module.exports = router;