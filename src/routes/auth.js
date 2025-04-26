const { Router } = require('express');
const controllers = require('../controllers');
const loginValidation = require('../middlewares/loginValidation');

const router = Router();

router.post('/login', loginValidation, controllers.auth.login);

module.exports = router;