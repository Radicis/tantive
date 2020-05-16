import React, { useContext } from 'react';
import { Context } from '../store/Store';
import { animated, useTransition, config } from 'react-spring';
import axios from 'axios';
import { host, port } from '../config';
import Search from '../components/Search/Search';

function SearchContainer() {
  const [state, dispatch] = useContext(Context);
  const { scripts, documents, windows, showSearch } = state;

  const hideSearch = () => {
    dispatch({
      type: 'HIDE_SEARCH'
    });
  };

  const createScriptWindow = async (id) => {
    try {
      const { data } = await axios.post(`http://${host}:${port}/runs/${id}`, {
        windowId: windows.length
      });
      const { runId } = data;
      dispatch({
        type: 'CREATE_SCRIPT_WINDOW',
        payload: {
          id,
          runId
        }
      });
      hideSearch();
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: e
      });
    }
  };

  const createEditorWindow = (id) => {
    hideSearch();
    dispatch({
      type: 'CREATE_DOCUMENT_WINDOW',
      payload: { id }
    });
  };

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`http://${host}:${port}/documents/${id}`);
      dispatch({
        type: 'DELETE_ITEM',
        payload: id
      });
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: e
      });
    }
  };

  const deleteScript = async (id) => {
    try {
      await axios.delete(`http://${host}:${port}/scripts/${id}`);
      dispatch({
        type: 'DELETE_ITEM',
        payload: id
      });
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: e
      });
    }
  };

  const transition = useTransition(showSearch, null, {
    config: config.stiff,
    from: {
      transform: 'translate3d(0,-50px,0)',
      opacity: 0,
      position: 'fixed'
    },
    enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
    leave: {
      transform: 'translate3d(0,-50px,0)',
      opacity: 0,
      position: 'fixed'
    }
  });

  return (
    <React.Fragment>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="modal flex w-full z-10 h-full absolute items-start justify-center"
              onClick={() => hideSearch()}
            >
              <Search
                scripts={scripts}
                documents={documents}
                deleteScript={deleteScript}
                deleteDocument={deleteDocument}
                createEditorWindow={createEditorWindow}
                createScriptWindow={createScriptWindow}
              />
            </animated.div>
          )
      )}
    </React.Fragment>
  );
}

export default SearchContainer;
