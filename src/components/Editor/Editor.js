import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Editor({ handleContentChange, content }) {
  const [localContent, setLocalContent] = useState(content);
  const handleChange = (e) => {
    const { value } = e.target;
    setLocalContent(value);
    handleContentChange(value);
  };
  return (
    <div className="flex flex-grow text-lg font-mono">
      <textarea
        className="bg-dark w-full outline-none"
        value={localContent}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

Editor.propTypes = {
  content: PropTypes.string,
  handleContentChange: PropTypes.func
};

export default Editor;
