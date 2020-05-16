import React from 'react';
import { Converter } from 'showdown';
import './github-markdown.css';
import PropTypes from 'prop-types';

function Renderer({ content }) {
  const converter = new Converter();
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
