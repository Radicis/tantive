const CRUD = require('./crud');

module.exports = {
  documents: new CRUD('documents'),
  scripts: new CRUD('scripts')
};
