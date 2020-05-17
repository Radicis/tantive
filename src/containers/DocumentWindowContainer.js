import React, { useContext, useState } from 'react';
import { Context } from '../store/Store';
import axios from 'axios';
import EditorWindow from '../components/EditorWindow/EditorWindow';
import PropTypes from 'prop-types';

function DocumentWindowContainer({
  id,
  name,
  closeWindow,
  windowId,
  content,
  setFocused,
  focused,
  canExpand,
  isEven,
  status,
  isNew
}) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);
  const [updateTimeout, setUpdateTimeout] = useState(null);
  const [nameUpdateTimeout, setNameUpdateTimeout] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/documents/${id}`);
      dispatch({
        type: 'CLOSE_WINDOW',
        payload: windowId
      });
      dispatch({
        type: 'DELETE_DOCUMENT',
        payload: id
      });
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: e
      });
    }
  };

  const handleContentChange = (content) => {
    clearTimeout(updateTimeout);
    setUpdateTimeout(
      setTimeout(async () => {
        dispatch({
          type: 'SET_WINDOW_STATUS',
          payload: {
            windowId,
            status: 'Saving...'
          }
        });
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
        dispatch({
          type: 'SET_WINDOW_STATUS',
          payload: {
            windowId,
            status: 'Saved'
          }
        });
      }, 1500)
    );
  };

  const handleNameChange = (name) => {
    clearTimeout(nameUpdateTimeout);
    setNameUpdateTimeout(
      setTimeout(async () => {
        dispatch({
          type: 'SET_WINDOW_STATUS',
          payload: {
            windowId,
            status: 'Saving...'
          }
        });
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
        dispatch({
          type: 'SET_WINDOW_STATUS',
          payload: {
            windowId,
            status: 'Saved.'
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
      isEven={isEven}
      name={name}
      status={status}
      closeWindow={closeWindow}
      canExpand={canExpand}
      handleContentChange={handleContentChange}
      handleNameChange={handleNameChange}
      handleDelete={() => handleDelete(id)}
      setFocused={setFocused}
    />
  );
}

DocumentWindowContainer.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  windowId: PropTypes.number,
  status: PropTypes.string,
  closeWindow: PropTypes.func,
  focused: PropTypes.bool,
  isEven: PropTypes.bool,
  canExpand: PropTypes.bool,
  isNew: PropTypes.bool,
  setFocused: PropTypes.func
};

export default DocumentWindowContainer;
