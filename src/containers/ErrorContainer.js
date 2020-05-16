import React, { useContext } from 'react';
import { Context } from '../store/Store';
import { animated, useTransition, config } from 'react-spring';
import Error from '../components/Error/Error';

function ErrorContainer() {
  const [state] = useContext(Context);
  const { error } = state;

  const errorTransition = useTransition(error, null, {
    config: config.gentle,
    from: {
      opacity: 1
    },
    enter: { opacity: 1 },
    leave: {
      opacity: 0
    }
  });

  return (
    <React.Fragment>
      {errorTransition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="text-mid fixed text-xl font-semi-bol opacity-50 w-full h-full flex justify-center items-center flex flex-col pointer-events-none"
            >
              <Error error={error} />
            </animated.div>
          )
      )}
    </React.Fragment>
  );
}

export default ErrorContainer;
