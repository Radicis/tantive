import React, { useContext } from 'react';
import { Context } from '../store/Store';
import { host, port } from '../config';
import axios from 'axios';
import Create from '../components/Create/Create';
import { animated, useTransition, config } from 'react-spring';

function CreateContainer() {
  const [state, dispatch] = useContext(Context);
  const { showCreate, windows } = state;

  const hideCreate = () => {
    dispatch({
      type: 'HIDE_CREATE'
    });
  };

  const handleSubmit = async (name, filePath, params = []) => {
    try {
      const { data } = await axios.post(`http://${host}:${port}/scripts`, {
        name,
        path: filePath,
        params
      });
      dispatch({
        type: 'CREATE_SCRIPT',
        payload: data
      });
      const { id } = data;
      const { data: runData } = await axios.post(
        `http://${host}:${port}/runs/${id}`,
        {
          windowId: windows.length
        }
      );
      const { runId } = runData;
      dispatch({
        type: 'CREATE_SCRIPT_WINDOW',
        payload: {
          id,
          runId,
          status: 'Ready'
        }
      });
      hideCreate();
    } catch (e) {
      alert(e);
    }
  };

  const transition = useTransition(showCreate, null, {
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
              className="flex modal w-full z-10 h-full absolute items-start justify-center"
            >
              <Create handleSubmit={handleSubmit} hideCreate={hideCreate} />
            </animated.div>
          )
      )}
    </React.Fragment>
  );
}

export default CreateContainer;
