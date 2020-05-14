import React, { useContext } from 'react';
import { Context } from '../store/Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCodeBranch,
  faRemoveFormat
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function SidebarContainer() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  const createDocument = async () => {
    const { data } = await axios.post('http://localhost:5555/documents', {
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
    <div className="bg-light flex flex-col flex-grow overflow-auto text-mid items-stretch justify-start p-4">
      <div className="flex p-2 opacity-25 mb-4 justify-center">
        <FontAwesomeIcon icon={faCodeBranch} color="#fefefe" size="lg" />
      </div>
      <div
        className="transition duration-200 ease-in-out rounded-lg shadow flex p-2 cursor-pointer bg-red-700 hover:bg-red-600 mb-4 justify-center"
        onClick={() => createScript()}
      >
        <FontAwesomeIcon icon={faCodeBranch} color="#fefefe" size="lg" />
      </div>
      <div
        className="transition duration-200 ease-in-out rounded-lg shadow flex p-2 cursor-pointer bg-red-700 hover:bg-red-600 mb-4 justify-center"
        onClick={() => createDocument()}
      >
        <FontAwesomeIcon icon={faRemoveFormat} color="#fefefe" size="lg" />
      </div>
      <div
        className="transition duration-200 ease-in-out rounded-lg p-2 flex cursor-pointer justify-center hover:bg-dark"
        onClick={() => find()}
      >
        <FontAwesomeIcon icon={faSearch} color="#a9a9aa" size="lg" />
      </div>
    </div>
  );
}

export default SidebarContainer;
