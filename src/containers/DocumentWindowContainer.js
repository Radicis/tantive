import React, { useContext, useState } from 'react';
import { Context } from '../store/Store';
import axios from 'axios';
import EditorWindow from '../components/EditorWindow/EditorWindow';
import PropTypes from 'prop-types';

function DocumentWindowContainer({
  id,
  name,
  closeWindow,
  content,
  setFocused,
  focused,
  isNew
}) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);
  const [updateTimeout, setUpdateTimeout] = useState(null);
  const [nameUpdateTimeout, setNameUpdateTimeout] = useState(null);

  const deleteDocument = (windowId) => {
    // TODO: Delete the document
    dispatch({
      type: 'CLOSE_WINDOW',
      payload: windowId
    });
  };

  const handleContentChange = (content) => {
    clearTimeout(updateTimeout);
    setUpdateTimeout(
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

  const handleNameChange = (name) => {
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

  return (
    <EditorWindow
      focused={focused}
      content={content}
      isNew={isNew}
      name={name}
      closeWindow={closeWindow}
      handleContentChange={handleContentChange}
      handleNameChange={handleNameChange}
      setFocused={setFocused}
    />
  );
}

DocumentWindowContainer.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  closeWindow: PropTypes.func,
  focused: PropTypes.bool,
  isNew: PropTypes.bool,
  setFocused: PropTypes.func
};

export default DocumentWindowContainer;
