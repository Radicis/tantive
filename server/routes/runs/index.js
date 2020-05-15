const router = require('express').Router();
const RunningScripts = require('../../models/runningScripts');
const { scripts } = require('../../store/index');

router.post('/:id', (req, res) => {
  const { id } = req.params;
  const { windowId } = req.body;
  const { path } = scripts.get(id);
  if (!path) {
    return res.status(404).send(new Error('Not found'));
  }
  return res.json(RunningScripts.addRun(path, windowId));
});

module.exports = router;
