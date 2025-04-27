const { Router } = require('express');
const controllers = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeAdmin = require('../middlewares/authorizeAdmin');
const commentValidation = require('../middlewares/commentValidation');

const router = Router();

router.get('/', controllers.post.getAllPosts);
router.post('/', authenticateUser, authorizeAdmin, controllers.post.createPost);
router.get('/:postId', controllers.post.getPost);
router.put('/:postId', authenticateUser, authorizeAdmin, controllers.post.publishPost);
router.post('/:postId/comments', commentValidation, authenticateUser, controllers.post.createComment);

module.exports = router;