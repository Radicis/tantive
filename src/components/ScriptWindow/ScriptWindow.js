import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStopCircle,
  faChevronCircleRight,
  faWindowClose,
  faCog,
  faSquare
} from '@fortawesome/free-solid-svg-icons';
import ScriptConfig from '../ScriptConfig/ScriptConfig';

function ScriptWindow({
  logLines,
  name,
  closeWindow,
  runScript,
  terminateScript,
  setArgs,
  status,
  setFocused,
  focused
}) {
  const messagesEndRef = useRef(null);
  const [showConfig, setShowConfig] = useState(false);
  const [params, setParams] = useState({});

  const scrollToBottom = () => {
    try {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [logLines, status]);

  const toggleConfig = () => {
    setShowConfig(!showConfig);
  };

  const renderLogLine = (line, i) => {
    return (
      <div
        key={i}
        className="px-2 hover:bg-light text-terminal cursor-pointer"
        ref={messagesEndRef}
        onClick={() => navigator.clipboard.writeText(line)}
      >
        {line}
      </div>
    );
  };

  return (
    <div
      className={`window w-full h-full border-light flex flex-col text-mid ${
        focused ? 'absolute' : ''
      }`}
    >
      <div className="p-2 flex flex-row bg-light">
        <div className="flex flex-grow">{name}</div>
        <div className="cursor-pointer mr-2" onClick={toggleConfig}>
          <FontAwesomeIcon icon={faCog} color="#c53030" size="lg" />
        </div>
        <div className="cursor-pointer mr-2" onClick={setFocused}>
          <FontAwesomeIcon icon={faSquare} color="#c53030" size="lg" />
        </div>
        <div className="cursor-pointer mr-2" onClick={terminateScript}>
          <FontAwesomeIcon icon={faStopCircle} color="#c53030" size="lg" />
        </div>
        <div className="cursor-pointer mr-2" onClick={runScript}>
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            color="#c53030"
            size="lg"
          />
        </div>
        <div className="cursor-pointer" onClick={closeWindow}>
          <FontAwesomeIcon icon={faWindowClose} color="#c53030" size="lg" />
        </div>
      </div>
      {showConfig ? (
        <div className="w-full h-full">
          <ScriptConfig setArgs={setArgs} params={params} />
        </div>
      ) : (
        <div className="flex flex-grow bg-dark flex-col overflow-x-hidden overflow-y-auto">
          {logLines && logLines.length > 0
            ? logLines.map((l, i) => renderLogLine(l, i))
            : ''}
        </div>
      )}

      <div className="bg-light text-right text-xs p-2">{status}</div>
    </div>
  );
}

ScriptWindow.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  logLines: PropTypes.array,
  closeWindow: PropTypes.func,
  runScript: PropTypes.func,
  focused: PropTypes.bool,
  terminateScript: PropTypes.func,
  setArgs: PropTypes.func,
  setFocused: PropTypes.func
};

export default ScriptWindow;
