import React, { useContext, useRef, useState } from 'react';
import { Context } from '../store/Store';
import { ipcRenderer } from 'electron';

function CreateContainer() {
  const [state, dispatch] = useContext(Context);
  const fileInputRef = useRef();
  const { showCreate, windows } = state;
  const [filePath, setFilePath] = useState(null);
  const [name, setName] = useState(null);

  const hideCreate = () => {
    dispatch({
      type: 'HIDE_CREATE'
    });
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const createScriptWindow = () => {
    hideCreate();
    dispatch({
      type: 'CREATE_SCRIPT_WINDOW',
      payload: name
    });
    ipcRenderer.send('init', { windowId: windows.length, name });
  };

  const createConsoleWindow = () => {
    hideCreate();
    dispatch({
      type: 'CREATE_SCRIPT_WINDOW',
      payload: name
    });
    ipcRenderer.send('init', { windowId: windows.length, name });
  };

  const handleSubmit = () => {
    if (name && filePath) {
      dispatch({
        type: 'CREATE_SCRIPT',
        payload: {
          name,
          filePath
        }
      });
    }
    hideCreate();
    dispatch({
      type: 'CREATE_SCRIPT_WINDOW',
      payload: name
    });
    ipcRenderer.send('init', { windowId: windows.length });
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const setFile = (file) => {
    const { path } = file;
    setFilePath(path);
  };

  return (
    <React.Fragment>
      {showCreate ? (
        <div
          className="search-container flex w-full z-10 h-full absolute items-start justify-center"
          onClick={() => hideCreate()}
        >
          <form
            onClick={handleClick}
            onSubmit={handleSubmit}
            className="search-form rounded-lg bg-light shadow-xl shadow-xl border border-mid text-mid flex flex-col p-4 mt-12"
          >
            <div className="text-center text-lg font-semi-bold">
              Create New Script
            </div>
            <div className="flex flex-col">
              <input
                placeholder="Script Name"
                onChange={handleNameChange}
                id="name"
                name="name"
                className="bg-light flex flex-grow outline-none p-2 my-2"
              />
              <input
                ref={fileInputRef}
                name="file"
                id="file"
                onChange={() => setFile(fileInputRef.current.files[0])}
                placeholder="Script Path"
                className="flex flex-grow outline-none p -2 mb-2"
                type="file"
              />

              <div>Args</div>
            </div>
            <button type="submit">OK</button>
          </form>
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  );
}

export default CreateContainer;
