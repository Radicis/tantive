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
        className="modal-content rounded-lg bg-light shadow-xl border border-mid text-mid flex flex-col p-4 mt-12"
      >
        <div className="font-bold mb-4 text-xl text-center">Warning</div>
        <div className="bg-dark p-6 overflow-auto rounded-lg text-center">
          <div>{content}</div>
        </div>
        <div className="text-center font-semi-bold text-lg p-4">
          Are you sure?
        </div>
        <div className="flex flex-row font-semi-bold text-lg justify-center">
          <button className="p-4 mr-8" onClick={confirm}>
            Yes
          </button>
          <button className="p-4" onClick={hideConfirm}>
            No
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
