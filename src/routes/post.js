const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Posts route' });
})

module.exports = router;