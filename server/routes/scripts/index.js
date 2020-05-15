const router = require('express').Router();
const { scripts } = require('../../store');

router.get('/', (req, res) => {
  return res.json(scripts.all());
});

router.post('/', (req, res) => {
  const item = req.body;
  return res.json(scripts.create(item));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const item = req.body;
  return res.json(scripts.update(id, item));
});

module.exports = router;
