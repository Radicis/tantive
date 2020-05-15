import React, { useContext, useState } from 'react';
import { Context } from '../store/Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import DocumentWindowContainer from './DocumentWindowContainer';
import ScriptWindowContainer from './ScriptWindowContainer';

function WindowsContainer() {
  const [state, dispatch] = useContext(Context);
  const [focused, setIsFocused] = useState(false);
  const { windows } = state;

  const closeWindow = (windowId) => {
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
                <ScriptWindowContainer
                  id={id}
                  runId={runId}
                  key={windowId}
                  windowId={windowId}
                  focused={focused === windowId}
                  logLines={logLines}
                  name={name}
                  args={args}
                  status={status}
                  params={params}
                  closeWindow={() => closeWindow(windowId, runId)}
                  setFocused={() => setFocused(windowId)}
                />
              );
            }
            return (
              <DocumentWindowContainer
                id={id}
                key={windowId}
                windowId={windowId}
                focused={focused === windowId}
                content={content}
                logLines={logLines}
                isNew={isNew}
                name={name}
                closeWindow={() => closeWindow(windowId)}
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

export default WindowsContainer;
