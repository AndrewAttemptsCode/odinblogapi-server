const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', controllers.post.getAllPosts);
router.post('/', controllers.post.createPost);
router.get('/:postId', controllers.post.getPost);

module.exports = router;