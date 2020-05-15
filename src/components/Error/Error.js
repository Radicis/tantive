import React from 'react';
import PropTypes from 'prop-types';

function Error({ error }) {
  return (
    <div className="text-xl text-mid flex flex-col">
      <div>Error!</div>
      <div>{error.toString()}</div>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.object
};

export default Error;
