import React from 'react';
import PropTypes from 'prop-types';

function Confirm({ hideConfirm, content, confirm }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={hideConfirm}
      className="flex w-full z-10 h-full absolute items-start justify-center"
    >
      <div
        onClick={handleClick}
        className="modal-content rounded-lg bg-light shadow border border-mid text-mid flex flex-col p-4 mt-12"
      >
        <div className="text-xl font-semi-bold p-8 overflow-auto rounded-lg text-center">
          <div>{content}</div>
        </div>
        <div className="text-center font-semi-bold text-lg mb-8">
          Are you sure?
        </div>
        <div className="flex flex-row font-semi-bold text-lg justify-center">
          <button
            className="border border-dark hover:border-mid rounded-lg px-10 py-2 mr-8"
            onClick={hideConfirm}
          >
            No
          </button>
          <button
            className="border border-dark hover:border-mid rounded-lg px-10 py-2"
            onClick={confirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

Confirm.propTypes = {
  content: PropTypes.string,
  hideConfirm: PropTypes.func,
  confirm: PropTypes.func
};

export default Confirm;
