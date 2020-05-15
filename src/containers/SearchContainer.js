import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCodeBranch,
  faStickyNote,
  faWindowClose
} from '@fortawesome/free-solid-svg-icons';
import { animated, useTransition, config } from 'react-spring';
import axios from 'axios';
import { host, port } from '../config';
import Search from '../components/Search/Search';

function SearchContainer() {
  const [state, dispatch] = useContext(Context);
  const [filtered, setFiltered] = useState(null);
  const { scripts, documents, windows, showSearch } = state;

  const hideSearch = () => {
    setFiltered(null);
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
              className="search-container modal flex w-full z-10 h-full absolute items-start justify-center"
              onClick={() => hideSearch()}
            >
              <Search
                scripts={scripts}
                documents={documents}
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
