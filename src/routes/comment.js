const { Router } = require('express');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeAdmin = require('../middlewares/authorizeAdmin');
const controllers = require('../controllers/index');

const router = Router();

router.get('/', authenticateUser, authorizeAdmin, controllers.comment.getComments);
router.delete('/:commentId', authenticateUser, authorizeAdmin, controllers.comment.removeComment);

module.exports = router;
