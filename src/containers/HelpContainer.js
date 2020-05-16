import React, { useContext } from 'react';
import { Context } from '../store/Store';
import { animated, useTransition, config } from 'react-spring';
import Help from '../components/Help/Help';

function HelpContainer() {
  const [state, dispatch] = useContext(Context);
  const { showHelp } = state;

  const hideHelp = () => {
    dispatch({
      type: 'HIDE_HELP'
    });
  };

  const transition = useTransition(showHelp, null, {
    config: config.stiff,
    from: {
      transform: 'translate3d(0,-50px,0)',
      opacity: 0,
      position: 'fixed'
    },
    enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
    leave: {
      transform: 'translate3d(0,-50px,0)',
      opacity: 0,
      position: 'fixed'
    }
  });

  return (
    <React.Fragment>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="modal flex w-full z-10 h-full absolute items-start justify-center"
            >
              <Help hideHelp={hideHelp} />
            </animated.div>
          )
      )}
    </React.Fragment>
  );
}

export default HelpContainer;
