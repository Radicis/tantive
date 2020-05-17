import React from 'react';
import showdown from 'showdown';
import './github-markdown.css';
import PropTypes from 'prop-types';
import showdownHighlight from 'showdown-highlight';

function Renderer({ content }) {
  const converter = new showdown.Converter({ extensions: [showdownHighlight] });
  const html = converter.makeHtml(content);

  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

Renderer.propTypes = {
  content: PropTypes.string
};

export default Renderer;
