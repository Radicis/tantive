import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faRemoveFormat
} from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor/Editor';
import Renderer from '../Renderer/Renderer';

function EditorWindow({
  name,
  closeWindow,
  content,
  deleteDocument,
  handleContentChange
}) {
  const [render, setRender] = useState(true);
  const toggleRender = () => {
    setRender(!render);
  };
  return (
    <div className="window border-light flex flex-col text-mid">
      <div className="p-2 flex flex-row bg-light">
        <div className="flex flex-grow">{name}</div>
        <div className="cursor-pointer mr-2" onClick={toggleRender}>
          <FontAwesomeIcon icon={faTimesCircle} color="#c53030" size="lg" />
        </div>
        <div className="cursor-pointer mr-2" onClick={deleteDocument}>
          <FontAwesomeIcon icon={faRemoveFormat} color="#c53030" size="lg" />
        </div>
        <div className="cursor-pointer" onClick={closeWindow}>
          <FontAwesomeIcon icon={faTimesCircle} color="#c53030" size="lg" />
        </div>
      </div>
      <div className="bg-dark flex flex-grow p-2">
        {render ? (
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
  windowId: PropTypes.number,
  closeWindow: PropTypes.func,
  deleteDocument: PropTypes.func,
  handleContentChange: PropTypes.func
};

export default EditorWindow;
