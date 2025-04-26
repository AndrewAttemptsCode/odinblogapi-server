const { Router } = require('express');
const controllers = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

const router = Router();

router.get('/', controllers.post.getAllPosts);
router.post('/', authenticateUser, authorizeAdmin, controllers.post.createPost);
router.get('/:postId', controllers.post.getPost);
router.put('/:postId', authenticateUser, authorizeAdmin, controllers.post.publishPost);
router.post('/:postId/comments', authenticateUser, controllers.post.createComment);

module.exports = router;