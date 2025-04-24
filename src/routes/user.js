const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', controllers.user.getAllUsers);
router.post('/', controllers.user.createUser);
router.get('/:userId', controllers.user.getUser);

module.exports = router;