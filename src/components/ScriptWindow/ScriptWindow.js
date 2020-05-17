import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStopCircle,
  faChevronCircleRight,
  faWindowClose,
  faSkullCrossbones,
  faCog,
  faEdit,
  faWindowMinimize,
  faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';
import ScriptConfig from '../ScriptConfig/ScriptConfig';

function ScriptWindow({
  logLines,
  name,
  closeWindow,
  runScript,
  terminateScript,
  handleNameChange,
  handleDelete,
  setArgs,
  status,
  setFocused,
  canExpand,
  focused
}) {
  const messagesEndRef = useRef(null);
  const [showConfig, setShowConfig] = useState(false);
  const [localName, setLocalName] = useState(name);
  const [params, setParams] = useState({});

  const scrollToBottom = () => {
    try {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      // ignore
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setLocalName(value);
    handleNameChange(value);
  };

  useEffect(() => {
    scrollToBottom();
  }, [logLines, status]);

  const toggleEdit = () => {
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
        <div className="flex flex-grow">
          {!showConfig ? (
            localName
          ) : (
            <div className="flex flex-row items-center">
              <input
                className="bg-light text-mid mr-2 outline-none"
                value={localName}
                onChange={handleChange}
                placeholder="Type Name.."
              />
              <FontAwesomeIcon icon={faEdit} color="#c53030" />
              <FontAwesomeIcon
                onClick={handleDelete}
                className="ml-2 cursor-pointer"
                icon={faSkullCrossbones}
                color="#c53030"
              />
            </div>
          )}
        </div>
        <div className="cursor-pointer mr-2" onClick={toggleEdit}>
          <FontAwesomeIcon icon={faCog} color="#c53030" size="lg" />
        </div>
        {canExpand ? (
          focused ? (
            <div className="cursor-pointer mr-2" onClick={setFocused}>
              <FontAwesomeIcon
                icon={faWindowMinimize}
                color="#c53030"
                size="lg"
              />
            </div>
          ) : (
            <div className="cursor-pointer mr-2" onClick={setFocused}>
              <FontAwesomeIcon
                icon={faWindowMaximize}
                color="#c53030"
                size="lg"
              />
            </div>
          )
        ) : (
          ''
        )}
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
  canExpand: PropTypes.bool,
  terminateScript: PropTypes.func,
  handleNameChange: PropTypes.func,
  handleDelete: PropTypes.func,
  setArgs: PropTypes.func,
  setFocused: PropTypes.func
};

export default ScriptWindow;
