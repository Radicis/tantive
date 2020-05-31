import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import SearchItem from '../SearchItem/SearchItem';

function Search({
  scripts = [],
  documents = [],
  createScriptWindow,
  createEditorWindow,
  deleteDocument,
  deleteScript
}) {
  const [filtered, setFiltered] = useState(null);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    setFuse(
      new Fuse(scripts.map((s) => ({ ...s, type: 'S' })).concat(documents), {
        keys: [
          { name: 'content', weight: 0.1 },
          { name: 'name', weight: 0.9 }
        ],
        includeScore: true
      })
    );
  }, [scripts, documents]);

  const handleChange = (e) => {
    const { value } = e.target;
    filter(value);
  };

  const filter = (value) => {
    if (value === '') {
      setFiltered(null);
    } else if (value === '*') {
      setFiltered(scripts.map((s) => ({ ...s, type: 'S' })).concat(documents));
    } else {
      const result = fuse
        .search(value)
        .sort((a, b) => b.score - a.score)
        .map((i) => i.item);
      setFiltered(result);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleDeleteScript = (id) => {
    setFiltered(filtered.filter((i) => i.id !== id));
    deleteScript(id);
  };

  const handleDeleteDocument = (id) => {
    setFiltered(filtered.filter((i) => i.id !== id));
    deleteDocument(id);
  };

  const renderItem = (item) => {
    const { name, type, id } = item;
    return (
      <SearchItem
        key={id}
        name={name}
        type={type}
        deleteDocument={() => handleDeleteDocument(id)}
        deleteScript={() => handleDeleteScript(id)}
        handleClick={() =>
          type ? createScriptWindow(id) : createEditorWindow(id)
        }
      />
    );
  };

  return (
    <form
      onClick={handleClick}
      className="modal-content overflow-hidden z-20 rounded-lg bg-light shadow-xl shadow-xl relative border border-mid text-mid mt-12"
    >
      <div className="text-xl flex flex-row p-4">
        <FontAwesomeIcon
          className="mr-4 hidden md:inline"
          icon={faSearch}
          color="#a9a9aa"
          size="lg"
        />
        <input
          autoFocus
          className="bg-light flex flex-grow outline-none"
          placeholder="Search..."
          onChange={handleChange}
        />
      </div>
      {filtered ? (
        filtered.length > 0 ? (
          <React.Fragment>
            <div
              className="text-xl pb-2 flex flex-col flex-grow overflow-auto"
              style={{ maxHeight: '75vh' }}
            >
              {filtered.map(renderItem)}
            </div>
            <div className="text-sm text-dark text-center pb-4">
              Hold to Delete
            </div>
          </React.Fragment>
        ) : (
          <div className="text-center font-semi-bold text-xl pb-4">
            No Results
          </div>
        )
      ) : null}
    </form>
  );
}

Search.propTypes = {
  scripts: PropTypes.array,
  documents: PropTypes.array,
  createScriptWindow: PropTypes.func,
  deleteDocument: PropTypes.func,
  deleteScript: PropTypes.func,
  createEditorWindow: PropTypes.func
};

export default Search;
