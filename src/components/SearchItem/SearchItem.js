import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faIndent } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

function SearchItem({
  type,
  id,
  name,
  deleteScript,
  deleteDocument,
  handleClick
}) {
  const [holdTimeout, setHoldTimeout] = useState(null);
  const [holding, setHolding] = useState(false);

  const grow = useSpring({
    config: {
      delay: 200,
      duration: holding ? 2000 : 200
    },
    w: !holding ? 0 : 100,
    opacity: holding ? 0.5 : 0.15
  });

  const handleMouseDown = (id, type) => {
    setTimeout(() => {
      setHolding(true);
    }, 200);
    setHoldTimeout(
      setTimeout(() => {
        if (type) {
          deleteScript();
        } else {
          deleteDocument();
        }
      }, 2000)
    );
  };

  const handleMouseUp = () => {
    if (holding) {
      clearTimeout(holdTimeout);
      setHolding(false);
    } else {
      clearTimeout(holdTimeout);
      setHolding(false);
      handleClick();
    }
  };

  return (
    <React.Fragment>
      {type ? (
        <div
          key={id}
          className="py-2 px-4 text-gray-100 cursor-pointer hover:bg-dark relative select-none"
          onMouseDown={() => handleMouseDown(id, 'S')}
          onMouseUp={handleMouseUp}
        >
          <animated.div
            className="bg-red-900 opacity-50 absolute top-0 left-0 h-full z-10"
            style={{
              ...grow,
              width: grow.w.interpolate((w) => {
                return `${w}%`;
              })
            }}
          />
          <div className="items-center flex flex-row z-20">
            <div className="flex flex-grow text-mid">{name}</div>
            <FontAwesomeIcon className="mr-l" icon={faCode} color="#c53030" />
          </div>
        </div>
      ) : (
        <div
          key={id}
          onMouseDown={() => handleMouseDown(id)}
          onMouseUp={handleMouseUp}
          className="py-2 px-4 text-gray-100 cursor-pointer hover:bg-dark relative select-none"
        >
          <animated.div
            className="bg-red-900 opacity-50 absolute top-0 left-0 h-full"
            style={{
              ...grow,
              width: grow.w.interpolate((w) => {
                return `${w}%`;
              })
            }}
          />
          <div className="items-center flex flex-row z-20">
            <div className="flex flex-grow text-mid">{name}</div>
            <FontAwesomeIcon className="ml-4" icon={faIndent} color="#c53030" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

SearchItem.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  deleteScript: PropTypes.func,
  deleteDocument: PropTypes.func,
  handleClick: PropTypes.func
};

export default SearchItem;
