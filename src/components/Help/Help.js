/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Renderer from "../Renderer/Renderer";

const helpText = `
### Headings
\`\`\`
# H1
## H2
\`\`\`
### Lists
\`\`\`
* Item 1
  * item 1a

1. Item 1
  * Item 1a
\`\`\`
### Emphasis
\`\`\`
*emphasis*
**strong**
~~strikethrough~~
\`\`\`
### Links
\`\`\`
[title](url)
\`\`\`
### Images
\`\`\`
![alt](url)
\`\`\`
`;

function Help({ hideHelp }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={hideHelp}
      className="flex w-full z-10 h-full absolute items-start justify-center"
    >
      <div
        onClick={handleClick}
        className="modal-content rounded-lg bg-light shadow-xl border border-mid text-mid flex flex-col p-4 mt-12">
        <div className="font-bold mb-4 text-xl text-center">
          Markdown help
        </div>
        <div className="bg-dark px-4 py-2  overflow-auto rounded-lg">
          <Renderer content={helpText} />
        </div>

      </div>
    </div>
  );
}

Help.propTypes = {
  hideHelp: PropTypes.func
};

export default Help;
