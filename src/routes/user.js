const { Router } = require('express');
const controllers = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

const router = Router();

router.get('/', authenticateUser, authorizeAdmin, controllers.user.getAllUsers);
router.post('/', controllers.user.createUser);
router.get('/:userId', authenticateUser, authorizeAdmin, controllers.user.getUser);

module.exports = router;