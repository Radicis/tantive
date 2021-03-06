import React, { useContext, useState } from 'react';
import { Context } from '../store/Store';
import axios from 'axios';
import EditorWindow from '../components/EditorWindow/EditorWindow';
import PropTypes from 'prop-types';
import { host, port } from '../config';

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

  const createNewDocument = async () => {
    try {
      const { data } = await axios.post(`http://${host}:${port}/documents`, {
        content,
        name
      });
      dispatch({
        type: 'CREATE_DOCUMENT',
        payload: {
          windowId,
          data
        }
      });
      const { id } = data;
      return id;
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: e
      });
    }
  };

  const handleDelete = async () => {
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

  const updateWindowContent = (content) => {
    dispatch({
      type: 'UPDATE_WINDOW_CONTENT',
      payload: {
        windowId,
        data: {
          content
        }
      }
    });
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

  const handleNameChange = async (name, content) => {
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
        let docId = id;
        if (!docId) {
          docId = await createNewDocument(name, content);
        }
        await axios.put(`http://localhost:5555/documents/${docId}`, {
          name
        });
        dispatch({
          type: 'UPDATE_DOCUMENT',
          payload: {
            id: docId,
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

  const confirmClose = () => {
    if (id) {
      closeWindow();
    } else {
      dispatch({
        type: 'SET_CONFIRM_ACTION',
        payload: closeWindow
      });
      dispatch({
        type: 'SHOW_CONFIRM',
        payload: 'You are about to close an unsaved document!'
      });
    }
  };

  const confirmDelete = () => {
    dispatch({
      type: 'SET_CONFIRM_ACTION',
      payload: handleDelete
    });
    dispatch({
      type: 'SHOW_CONFIRM',
      payload: 'You are about to delete this document?'
    });
  };

  return (
    <div
      className={`window border-light flex flex-col text-mid h-full w-full ${
        focused ? 'absolute z-30' : ''
      }`}
    >
      <EditorWindow
        focused={focused}
        content={content}
        isNew={isNew}
        isEven={isEven}
        name={name}
        status={status}
        isSaved={!!id}
        closeWindow={confirmClose}
        canExpand={canExpand}
        handleContentChange={handleContentChange}
        updateWindowContent={updateWindowContent}
        handleNameChange={handleNameChange}
        handleDelete={confirmDelete}
        setFocused={setFocused}
      />
    </div>
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
