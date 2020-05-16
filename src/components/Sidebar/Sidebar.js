import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faIndent,
  faQuestion,
  faCode,
  faFeatherAlt
} from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

function Sidebar({ createScript, createDocument, find, showHelp }) {
  return (
    <div className="bg-light flex flex-col flex-grow overflow-auto text-mid items-stretch justify-start p-4">
      <div className="flex p-2 opacity-25 mb-4 justify-center">
        <FontAwesomeIcon icon={faFeatherAlt} color="#fefefe" size="lg" />
      </div>
      <div className="flex flex-col flex-grow">
        <div
          className="transition duration-200 ease-in-out rounded-lg shadow flex p-2 cursor-pointer bg-red-700 hover:bg-red-600 mb-4 justify-center"
          onClick={createScript}
        >
          <FontAwesomeIcon icon={faCode} color="#fefefe" size="lg" />
        </div>
        <div
          className="transition duration-200 ease-in-out rounded-lg shadow flex p-2 cursor-pointer bg-red-700 hover:bg-red-600 mb-4 justify-center"
          onClick={createDocument}
        >
          <FontAwesomeIcon icon={faIndent} color="#fefefe" size="lg" />
        </div>
        <div
          className="transition duration-200 ease-in-out rounded-lg p-2 mb-4 flex cursor-pointer justify-center hover:bg-dark"
          onClick={find}
        >
          <FontAwesomeIcon icon={faSearch} color="#a9a9aa" size="lg" />
        </div>
      </div>
      <div
        className="transition duration-200 ease-in-out rounded-lg p-2 flex cursor-pointer justify-center hover:bg-dark"
        onClick={showHelp}
      >
        <FontAwesomeIcon icon={faQuestion} color="#a9a9aa" />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  createScript: PropTypes.func,
  createDocument: PropTypes.func,
  find: PropTypes.func,
  showHelp: PropTypes.func
};

export default Sidebar;
