import React, { useContext } from 'react';
import { Context } from '../store/Store';
import { ipcRenderer } from 'electron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Window from '../components/Window/Window';
import EditorWindow from '../components/EditorWindow/EditorWindow';

function WindowContainer() {
  const [state, dispatch] = useContext(Context);
  const { windows } = state;

  const closeWindow = (windowId, runId) => {
    if (runId) {
      terminateScript(runId);
    }
    dispatch({
      type: 'CLOSE_WINDOW',
      payload: windowId
    });
  };

  const deleteDocument = (windowId) => {
    // TODO: Delete the document

    dispatch({
      type: 'CLOSE_WINDOW',
      payload: windowId
    });
  };

  const handleContentChange = (documentId, content) => {
    console.log(documentId, content);
    dispatch({
      type: 'UPDATE_DOCUMENT',
      payload: {
        documentId,
        content
      }
    });
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
        <div className="windows grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-full overflow-auto">
          {windows.map((window) => {
            const {
              windowId,
              runId,
              args,
              logLines,
              params,
              name,
              content,
              type,
              documentId
            } = window;
            if (type === 'SCRIPT') {
              return (
                <Window
                  key={windowId}
                  logLines={logLines}
                  name={name}
                  args={args}
                  params={params}
                  closeWindow={() => closeWindow(windowId, runId)}
                  terminateScript={() => runId && terminateScript(runId)}
                  runScript={() => runId & runScript(runId, windowId, args)}
                  setArgs={setArgs}
                />
              );
            }
            return (
              <EditorWindow
                key={windowId}
                content={content}
                logLines={logLines}
                name={name}
                closeWindow={() => closeWindow(windowId, runId)}
                deleteDocument={() => deleteDocument(windowId)}
                handleContentChange={(value) =>
                  handleContentChange(documentId, value)
                }
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
