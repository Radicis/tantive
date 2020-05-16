import React, { useContext } from 'react';
import { Context } from '../store/Store';
import WindowsContainer from './WindowsContainer';
import SidebarContainer from './SidebarContainer';
import Loading from '../components/Loading/Loading';
import { animated, config, useTransition, useSpring } from 'react-spring';

function MainContainer() {
  const [state] = useContext(Context);
  const { loading } = state;

  const transition = useTransition(loading, null, {
    config: config.gentle,
    from: {
      opacity: 1
    },
    enter: { opacity: 1 },
    leave: {
      opacity: 0
    }
  });

  const mainTransition = useSpring({
    delay: 500,
    opacity: loading ? 0 : 1
  });

  return (
    <React.Fragment>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="text-mid fixed text-xl font-semi-bol opacity-50 w-full h-full flex justify-center items-center flex flex-col pointer-events-none"
            >
              <Loading />
            </animated.div>
          )
      )}
      <animated.div
        style={mainTransition}
        className="opacity-0 relative main-grid grid grid-flow-col w-full h-full bg-dark"
      >
        <SidebarContainer />
        <WindowsContainer />
      </animated.div>
    </React.Fragment>
  );
}

export default MainContainer;
