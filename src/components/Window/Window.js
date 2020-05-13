import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faStopCircle,
  faChevronCircleRight,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import ScriptConfig from '../ScriptConfig/ScriptConfig';

function Window({
  logLines,
  name,
  params,
  closeWindow,
  runScript,
  terminateScript,
  setArgs,
  status
}) {
  const messagesEndRef = useRef(null);
  const [showConfig, setShowConfig] = useState(false);

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
    <div className="window border-light flex flex-col text-mid">
      <div className="p-2 flex flex-row bg-light">
        <div className="flex flex-grow">{name}</div>
        <div className="cursor-pointer mr-2" onClick={toggleConfig}>
          <FontAwesomeIcon icon={faCog} color="#c53030" size="lg" />
        </div>
        <div
          className="cursor-pointer mr-2"
          onClick={() => terminateScript(window)}
        >
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
          <FontAwesomeIcon icon={faTimesCircle} color="#c53030" size="lg" />
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

Window.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  logLines: PropTypes.array,
  params: PropTypes.array,
  windowId: PropTypes.number,
  closeWindow: PropTypes.func,
  runScript: PropTypes.func,
  terminateScript: PropTypes.func,
  setArgs: PropTypes.func
};

export default Window;
