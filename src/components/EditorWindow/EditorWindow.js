import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWindowClose,
  faRemoveFormat,
  faSquare,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor/Editor';
import Renderer from '../Renderer/Renderer';

function EditorWindow({
  name,
  closeWindow,
  content,
  handleContentChange,
  setFocused,
  focused,
  isNew,
  handleNameChange
}) {
  const [render, setRender] = useState(!isNew);
  const [localIsNew, setIsNew] = useState(isNew);
  const [localName, setLocalName] = useState(name);

  useEffect(() => {
    setLocalName(name);
  }, [name, content, focused]);

  const toggleRender = () => {
    setIsNew(false);
    setRender(!render);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setLocalName(value);
    handleNameChange(value);
  };
  return (
    <div
      className={`window border-light flex flex-col text-mid ${
        focused ? 'absolute w-full h-full' : ''
      }`}
    >
      <div className="p-2 flex flex-row bg-light">
        <div className="flex flex-grow">
          {!localIsNew && render ? (
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
            </div>
          )}
        </div>
        <div className="cursor-pointer mr-2" onClick={toggleRender}>
          <FontAwesomeIcon icon={faRemoveFormat} color="#c53030" size="lg" />
        </div>
        <div className="cursor-pointer mr-2" onClick={setFocused}>
          <FontAwesomeIcon icon={faSquare} color="#c53030" size="lg" />
        </div>
        <div className="cursor-pointer" onClick={closeWindow}>
          <FontAwesomeIcon icon={faWindowClose} color="#c53030" size="lg" />
        </div>
      </div>
      <div className="bg-dark flex flex-grow overflow-auto p-2">
        {!localIsNew && render ? (
          <Renderer
            handleContentChange={handleContentChange}
            content={content}
          />
        ) : (
          <Editor handleContentChange={handleContentChange} content={content} />
        )}
      </div>
    </div>
  );
}

EditorWindow.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  closeWindow: PropTypes.func,
  focused: PropTypes.bool,
  isNew: PropTypes.bool,
  handleContentChange: PropTypes.func,
  handleNameChange: PropTypes.func,
  setFocused: PropTypes.func
};

export default EditorWindow;
