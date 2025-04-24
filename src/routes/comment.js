const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Comments route' });
})

module.exports = router;