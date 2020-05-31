import React, { useContext } from 'react';
import { Context } from '../store/Store';
import { animated, useTransition, config } from 'react-spring';
import Confirm from '../components/Confirm/Confirm';

function ConfirmContainer() {
  const [state, dispatch] = useContext(Context);

  const { showConfirm, confirmAction } = state;

  const handleConfirm = () => {
    confirmAction();
    hideConfirm();
  };

  const hideConfirm = () => {
    dispatch({
      type: 'HIDE_CONFIRM'
    });
    dispatch({
      type: 'UNSET_CONFIRM_ACTION'
    });
  };

  const transition = useTransition(confirmAction && showConfirm, null, {
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
              className="modal flex w-full top-0 left-0 z-10 h-full fixed items-start justify-center"
            >
              <Confirm
                hideConfirm={hideConfirm}
                confirm={handleConfirm}
                content={showConfirm || ''}
              />
            </animated.div>
          )
      )}
    </React.Fragment>
  );
}

export default ConfirmContainer;
