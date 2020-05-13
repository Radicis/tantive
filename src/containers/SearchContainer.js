import React, { useContext, useState } from 'react';
import { Context } from '../store/Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCodeBranch,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons';
import { ipcRenderer } from 'electron';

function SearchContainer() {
  const [state, dispatch] = useContext(Context);
  const [filteredScripts, setFilteredScripts] = useState(null);
  const [filteredDocuments, setFilteredDocuments] = useState(null);
  const { scripts, documents, windows, showSearch } = state;

  const hideSearch = () => {
    dispatch({
      type: 'HIDE_SEARCH'
    });
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const createScriptWindow = (name) => {
    hideSearch();
    dispatch({
      type: 'CREATE_SCRIPT_WINDOW',
      payload: name
    });
    ipcRenderer.send('init', { windowId: windows.length, name });
  };

  const createEditorWindow = (name) => {
    hideSearch();
    dispatch({
      type: 'CREATE_EDITOR_WINDOW',
      payload: name
    });
  };

  const filter = (e) => {
    const { value } = e.target;
    setFilteredScripts(
      scripts.filter((s) => s.name.toUpperCase().includes(value.toUpperCase()))
    );
    setFilteredDocuments(
      documents.filter((s) =>
        s.name.toUpperCase().includes(value.toUpperCase())
      )
    );
  };

  const renderScript = (script) => {
    const { name } = script;
    return (
      <div
        className="p-2 text-gray-100 cursor-pointer hover:bg-gray-800 flex flex-row"
        onClick={() => createScriptWindow(name)}
      >
        <div className="flex flex-grow">{name}</div>{' '}
        <FontAwesomeIcon className="ml-4" icon={faCodeBranch} color="#a9a9aa" />
      </div>
    );
  };

  const renderDocument = (document) => {
    const { name } = document;
    return (
      <div
        className="p-2 text-gray-100 cursor-pointer hover:bg-gray-800 flex flex-row"
        onClick={() => createEditorWindow(name)}
      >
        <div className="flex flex-grow">{name}</div>{' '}
        <FontAwesomeIcon className="ml-4" icon={faStickyNote} color="#a9a9aa" />
      </div>
    );
  };

  return (
    <React.Fragment>
      {showSearch ? (
        <div
          className="search-container flex w-full z-10 h-full absolute items-center justify-center"
          onClick={() => hideSearch()}
        >
          <form
            onClick={handleClick}
            className="search-form rounded-lg bg-light shadow-xl shadow-xl border border-mid text-mid"
          >
            <div className="text-xl flex flex-row p-4">
              <FontAwesomeIcon
                className="mr-4 hidden md:inline"
                icon={faSearch}
                color="#a9a9aa"
                size="lg"
              />
              <input
                className="bg-light flex flex-grow"
                placeholder="Script Search"
                onChange={filter}
              />
            </div>
            {filteredScripts ? (
              filteredScripts.length > 0 ? (
                <div className="text-xl my-4">
                  {filteredScripts.map(renderScript)}
                </div>
              ) : (
                <div className="text-xl my-4 px-4">No Scripts found</div>
              )
            ) : (
              ''
            )}
            {filteredDocuments ? (
              filteredDocuments.length > 0 ? (
                <div className="text-xl my-4">
                  {filteredDocuments.map(renderDocument)}
                </div>
              ) : (
                <div className="text-xl my-4 px-4">No Documents found</div>
              )
            ) : (
              ''
            )}
          </form>
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  );
}

export default SearchContainer;
