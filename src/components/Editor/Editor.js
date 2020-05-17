import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Editor({ handleContentChange, content }) {
  const [localContent, setLocalContent] = useState(content);
  const handleChange = (e) => {
    const { value } = e.target;
    setLocalContent(value);
    handleContentChange(value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };
  return (
    <textarea
      className="resize-none font-mono bg-dark w-full h-full outline-none"
      placeholder="Type Here.."
      value={localContent}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
}

Editor.propTypes = {
  content: PropTypes.string,
  handleContentChange: PropTypes.func
};

export default Editor;
