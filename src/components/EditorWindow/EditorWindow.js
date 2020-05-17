import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWindowClose,
  faRemoveFormat,
  faWindowMinimize,
  faWindowMaximize,
  faEdit,
  faSkullCrossbones
} from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor/Editor';
import Renderer from '../Renderer/Renderer';
import { animated, useSpring, config } from 'react-spring';

function EditorWindow({
  name,
  closeWindow,
  content,
  handleContentChange,
  updateWindowContent,
  setFocused,
  focused,
  isNew,
  status,
  canExpand,
  handleNameChange,
  isSaved,
  isEven,
  handleDelete
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

  const props = useSpring({
    config: config.stiff,
    to: {
      transform: 'translate3d(0,0,0)',
      opacity: 1
    },
    from: {
      transform: isEven ? 'translate3d(-100px,0,0)' : 'translate3d(100px,0,0)',
      opacity: 0
    }
  });

  return (
    <animated.div
      style={props}
      className="border-light flex flex-col text-mid h-full w-full"
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
              <FontAwesomeIcon
                onClick={handleDelete}
                className="ml-2 cursor-pointer"
                icon={faSkullCrossbones}
                color="#c53030"
              />
            </div>
          )}
        </div>
        <div className="cursor-pointer mr-2" onClick={toggleRender}>
          <FontAwesomeIcon icon={faRemoveFormat} color="#c53030" size="lg" />
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
        <div className="cursor-pointer" onClick={closeWindow}>
          <FontAwesomeIcon icon={faWindowClose} color="#c53030" size="lg" />
        </div>
      </div>
      <div className="bg-dark flex flex-grow overflow-auto p-2">
        {!localIsNew && render ? (
          <Renderer content={content} />
        ) : (
          <Editor
            handleContentChange={
              isSaved ? handleContentChange : updateWindowContent
            }
            content={content}
          />
        )}
      </div>
      <div className="bg-light text-right text-xs p-2">{status}</div>
    </animated.div>
  );
}

EditorWindow.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  status: PropTypes.string,
  closeWindow: PropTypes.func,
  focused: PropTypes.bool,
  isSaved: PropTypes.bool,
  isEven: PropTypes.bool,
  isNew: PropTypes.bool,
  canExpand: PropTypes.bool,
  handleContentChange: PropTypes.func,
  handleDelete: PropTypes.func,
  handleNameChange: PropTypes.func,
  updateWindowContent: PropTypes.func,
  setFocused: PropTypes.func
};

export default EditorWindow;
