import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

function Create({ hideCreate, handleSubmit }) {
  const fileInputRef = useRef();
  const [filePath, setFilePath] = useState(null);
  const [name, setName] = useState(null);
  const [args, setArgs] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    if (name && filePath) {
      handleSubmit(name, filePath, args);
    }
  };

  const setFile = (file) => {
    const { path } = file;
    setFilePath(path);
  };

  return (
    <div
      className="search-container flex w-full z-10 h-full absolute items-start justify-center"
      onClick={hideCreate}
    >
      <form
        onClick={handleClick}
        onSubmit={handleLocalSubmit}
        className="search-form rounded-lg bg-light shadow-xl shadow-xl border border-mid text-mid flex flex-col p-4 mt-12"
      >
        <div className="text-center text-lg font-semi-bold">
          Create New Script
        </div>
        <div className="flex flex-col">
          <input
            placeholder="Script Name"
            onChange={handleNameChange}
            id="name"
            name="name"
            className="bg-light flex flex-grow outline-none p-2 my-2"
          />
          <input
            ref={fileInputRef}
            name="file"
            id="file"
            onChange={() => setFile(fileInputRef.current.files[0])}
            placeholder="Script Path"
            className="flex flex-grow outline-none p-2 mb-2"
            type="file"
          />

          <div>Args</div>
        </div>
        <button
          disabled={!(name && filePath)}
          type="submit"
          className="focus:outline-none"
        >
          Create
        </button>
      </form>
    </div>
  );
}

Create.propTypes = {
  hideCreate: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default Create;
