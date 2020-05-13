import React from 'react';
import PropTypes from 'prop-types';

function ScriptConfig({ params, toggleConfig }) {
  return <div className="window border-light flex flex-col text-mid"></div>;
}

ScriptConfig.propTypes = {
  params: PropTypes.array,
  setArgs: PropTypes.func,
  toggleConfig: PropTypes.func
};

export default ScriptConfig;
