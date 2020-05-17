import React, { useContext } from 'react';
import { Context } from '../store/Store';
import axios from 'axios';

import { host, port } from '../config';
import Sidebar from '../components/Sidebar/Sidebar';

function SidebarContainer() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  const createNewDocument = () => {
    dispatch({
      type: 'CREATE_NEW_DOCUMENT_WINDOW'
    });
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

  const showHelp = () => {
    dispatch({
      type: 'SHOW_HELP'
    });
  };

  return (
    <Sidebar
      createScript={createScript}
      createDocument={createNewDocument}
      find={find}
      showHelp={showHelp}
    />
  );
}

export default SidebarContainer;
