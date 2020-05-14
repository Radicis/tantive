import React, { useContext, useState } from 'react';
import { Context } from '../store/Store';
import { ipcRenderer } from 'electron';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import ScriptWindow from '../components/ScriptWindow/ScriptWindow';
import EditorWindow from '../components/EditorWindow/EditorWindow';

function WindowContainer() {
  const [state, dispatch] = useContext(Context);
  const [focused, setIsFocused] = useState(false);
  const [documentUpdateTimeout, setDocUpdateTimeout] = useState(null);
  const [nameUpdateTimeout, setNameUpdateTimeout] = useState(null);
  const { windows } = state;

  const closeWindow = (windowId, runId) => {
    if (runId) {
      terminateScript(runId);
    }
    setFocused(false);
    dispatch({
      type: 'CLOSE_WINDOW',
      payload: windowId
    });
  };

  const setFocused = (windowId) => {
    if (windowId === focused) {
      setIsFocused(false);
    } else {
      setIsFocused(windowId);
    }
  };

  const deleteDocument = (windowId) => {
    // TODO: Delete the document

    dispatch({
      type: 'CLOSE_WINDOW',
      payload: windowId
    });
  };

  const handleContentChange = (id, content) => {
    clearTimeout(documentUpdateTimeout);
    setDocUpdateTimeout(
      setTimeout(async () => {
        await axios.put(`http://localhost:5555/documents/${id}`, {
          content
        });
        dispatch({
          type: 'UPDATE_DOCUMENT',
          payload: {
            id,
            item: { content }
          }
        });
      }, 1500)
    );
  };

  const handleNameChange = (id, name) => {
    clearTimeout(nameUpdateTimeout);
    setNameUpdateTimeout(
      setTimeout(async () => {
        await axios.put(`http://localhost:5555/documents/${id}`, {
          name
        });
        dispatch({
          type: 'UPDATE_DOCUMENT',
          payload: {
            id,
            item: { name }
          }
        });
      }, 1500)
    );
  };

  const setArgs = (windowId, args) => {
    dispatch({
      type: 'SET_ARGS',
      payload: {
        windowId,
        args
      }
    });
  };

  const runScript = (runId, windowId, args) => {
    ipcRenderer.send('run', { runId, windowId, args });
  };

  const terminateScript = (runId) => {
    ipcRenderer.send('terminate', { runId });
  };

  return (
    <React.Fragment>
      {windows && windows.length > 0 ? (
        <div className="windows relative w-full h-full overflow-auto">
          {windows.map((window) => {
            const {
              windowId,
              runId,
              args,
              logLines,
              params,
              name,
              content,
              status,
              type,
              id,
              isNew
            } = window;
            if (type === 'SCRIPT') {
              return (
                <ScriptWindow
                  key={windowId}
                  focused={focused === windowId}
                  logLines={logLines}
                  name={name}
                  args={args}
                  status={status}
                  params={params}
                  closeWindow={() => closeWindow(windowId, runId)}
                  terminateScript={() => runId && terminateScript(runId)}
                  runScript={() => runId & runScript(runId, windowId, args)}
                  setFocused={() => setFocused(windowId)}
                  setArgs={setArgs}
                />
              );
            }
            return (
              <EditorWindow
                key={windowId}
                focused={focused === windowId}
                content={content}
                logLines={logLines}
                isNew={isNew}
                name={name}
                closeWindow={() => closeWindow(windowId, runId)}
                deleteDocument={() => deleteDocument(windowId)}
                handleNameChange={(value) =>
                  handleNameChange(id, value, windowId)
                }
                handleContentChange={(value) => handleContentChange(id, value)}
                setFocused={() => setFocused(windowId)}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full h-full flex items-center flex-col justify-center opacity-25">
          <div className="font-light text-3xl text-gray-100 mb-4">Tantive</div>
          <FontAwesomeIcon icon={faCodeBranch} color="#fefefe" size="2x" />
        </div>
      )}
    </React.Fragment>
  );
}

export default WindowContainer;
