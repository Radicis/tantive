const router = require('express').Router();
const { documents } = require('../../store');

router.get('/', (req, res) => {
  return res.json(documents.all());
});

router.post('/', (req, res) => {
  const item = req.body;
  return res.json(documents.create(item));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const item = req.body;
  return res.json(documents.update(id, item));
});

module.exports = router;
