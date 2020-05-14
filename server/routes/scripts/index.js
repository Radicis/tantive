const router = require('express').Router();
const { scripts } = require('../../store');

router.get('/', (req, res) => {
  return res.json(scripts.all());
});

module.exports = router;
