import React, { useContext } from 'react';
import { Context } from '../store/Store';
import axios from 'axios';

import { host, port } from '../config';
import Sidebar from '../components/Sidebar/Sidebar';

function SidebarContainer() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  const createDocument = async () => {
    try {
      const { data } = await axios.post(`http://${host}:${port}/documents`, {
        content: '',
        name: 'UNTITLED'
      });
      dispatch({
        type: 'CREATE_DOCUMENT',
        payload: data
      });
      const { id } = data;
      dispatch({
        type: 'CREATE_DOCUMENT_WINDOW',
        payload: {
          id,
          isNew: true
        }
      });
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: e
      });
    }
  };

  const createScript = () => {
    dispatch({
      type: 'SHOW_CREATE'
    });
  };

  const find = () => {
    dispatch({
      type: 'SHOW_SEARCH'
    });
  };

  return (
    <Sidebar
      createScript={createScript}
      createDocument={createDocument}
      find={find}
    />
  );
}

export default SidebarContainer;
